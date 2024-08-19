import { FC, createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback, SetStateAction } from 'react';
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { months } from '../constants';
import Day from '../models/day';
// import { days as dayNames } from '../constants';
import UserSettings from '../models/user-settings';
import themes from '../styles/themes';
import { DefaultTheme } from 'styled-components/dist/types';

const getSettings: () => UserSettings = () => {
  const loaded = localStorage.getItem('sor-schedule-ui_userSettings');
  if (!loaded)
    return { defaultLoadCurrentDay: false, defaultLoadFirstSheet: false, theme: 'Blue' };

  const parsed = JSON.parse(loaded);

  return {
    defaultLoadCurrentDay: parsed.defaultLoadCurrentDay ?? false,
    defaultLoadFirstSheet: parsed.defaultLoadFirstSheet ?? false,
    theme: parsed.theme || 'Blue',
  };
};

const today = new Date().getDay();

interface SheetsContextProps {
  worksheets: GoogleSpreadsheetWorksheet[] | undefined;
  sheetNames: string[];
  setSheet: (sheetName: string) => void
  currentSheet: GoogleSpreadsheetWorksheet | undefined;
  parsedColumns: string[][];
  instructorFilter: string;
  setInstructorFilter: React.Dispatch<SetStateAction<string>>;
  days: Day[] | undefined;
  day: number;
  setDay: (dayIndex: number) => void;
  userSettings: UserSettings;
  setUserSettings: React.Dispatch<SetStateAction<UserSettings>>;
  userTheme: DefaultTheme;
}

const SheetsContext = createContext<SheetsContextProps | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSheets = () => {
  const sheetsContext = useContext(SheetsContext);

  if (!sheetsContext)
    throw new Error(
      'sheets has to be used within <SheetsProvider>',
    );

  return sheetsContext;
};

interface SheetsProviderProps {
  children: ReactNode;
}

const SheetsProvider: FC<SheetsProviderProps> = ({ children }) => {
  const [worksheets, setWorksheets] = useState<GoogleSpreadsheetWorksheet[] | undefined>(undefined);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [currentSheet, setCurrentSheet] = useState<GoogleSpreadsheetWorksheet | undefined>();
  const [currGridSize, setCurrGridSize] = useState({ rows: 0, cols: 0 });
  const [parsedColumns, setParsedColumns] = useState<string[][]>([]);

  const [userSettings, setUserSettings] = useState<UserSettings>(getSettings());

  const [day, setDay] = useState(0);

  const [instructorFilter, setInstructorFilter] = useState(localStorage.getItem('sor-schedule-ui_instructor') || '');

  useEffect(() => localStorage.setItem('sor-schedule-ui_instructor', instructorFilter), [instructorFilter]);
  useEffect(() => localStorage.setItem('sor-schedule-ui_userSettings', JSON.stringify(userSettings)), [userSettings]);

  useEffect(() => {
    if (!worksheets && userSettings.defaultLoadCurrentDay)
      setDay(today);
  }, [worksheets, userSettings.defaultLoadCurrentDay]);

  useEffect(() => {
    const doc = new GoogleSpreadsheet(import.meta.env.VITE_SHEET_ID, { apiKey: import.meta.env.VITE_API_KEY });
    doc.loadInfo().then(() => setWorksheets(doc.sheetsByIndex));
  }, []);

  useEffect(() => {
    if (!worksheets)
      return;
    setSheetNames(worksheets.map(x => x.a1SheetName).filter(x => months.some(month => x.includes(month))));
  }, [worksheets]);

  const setSheet = useCallback((sheetName: string) => {
    if (!worksheets)
      return;
    const found = worksheets.find(x => x.a1SheetName === sheetName);
    if (!found)
      return;
    setCurrentSheet(found);
    setCurrGridSize({ rows: found.rowCount, cols: found.columnCount });
  }, [worksheets]);

  useEffect(() => {
    if (!currentSheet && userSettings.defaultLoadFirstSheet && worksheets)
      setSheet(worksheets[0].a1SheetName);
  }, [currentSheet, worksheets, userSettings.defaultLoadFirstSheet, setSheet]);
  
  useEffect(() => {
    if (!currentSheet)
      return;
    const parseColumns = async () => {
      await currentSheet.loadCells();
      const columns = Array.from(Array(currGridSize.cols).keys()).map(colNo => [...Array.from(Array(currGridSize.rows).keys()).map(rowNo => currentSheet.getCell(rowNo, colNo).formattedValue || '$emptyCell')]);
      setParsedColumns(columns);
    };
    parseColumns();
  }, [currentSheet, currGridSize]);

  const days = useMemo(() => {
    if (!parsedColumns.length || !instructorFilter)
      return undefined;
    const startIndicies = [0, 18, 36, 54, 73, 92, 110];
    // const startIndicies = dayNames.map(x => parsedColumns[0].findIndex(row => row?.toString().includes(x))).filter(x => x >= 0);
    const parsed: Day[] = startIndicies
      .map((x, i, self) => ({ name: parsedColumns[0][x]?.toString() || 'error', times: parsedColumns[0].slice(x, self[i + 1]), lessons: parsedColumns.map(column => column.slice(x, self[i + 1]).map((slot, slotIndex) => slotIndex === 0 ? '$emptyCell' : slot)) }))
      .map(x => {
        const possibleLastTimes = ['9:00', '9', '8:30', '8:00', '8'];
        const indexOfLastTimeSlot = x.times.length - 1 - x.times.toReversed().findIndex(time => possibleLastTimes.includes(time));
        return ({ ...x, times: x.times.slice(0, indexOfLastTimeSlot + 1), lessons: x.lessons.map(lessonArray => lessonArray.slice(0, indexOfLastTimeSlot + 1)) });
      });

    return parsed;
  }, [parsedColumns, instructorFilter]);

  const userTheme = useMemo(() =>  themes.find(x => x.name === userSettings.theme) || themes[0], [userSettings.theme]);


  const context = useMemo(() => ({
    worksheets,
    sheetNames,
    setSheet,
    currentSheet,
    parsedColumns,
    instructorFilter,
    setInstructorFilter,
    days,
    day,
    setDay,
    userSettings,
    setUserSettings,
    userTheme,
  }), [
    worksheets,
    sheetNames,
    setSheet,
    currentSheet,
    parsedColumns,
    instructorFilter,
    setInstructorFilter,
    days,
    day, setDay,
    userSettings,
    setUserSettings,
    userTheme
  ]);

  return (
    <SheetsContext.Provider value={ context }>
      { children }
    </SheetsContext.Provider>
  );
};

export default SheetsProvider;
