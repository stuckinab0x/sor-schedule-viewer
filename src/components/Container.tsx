import { FC, useEffect, useMemo, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useSheets } from '../contexts/sheets-provider';
import Nav from './Nav';
import InstructorFilterBar from './InstructorFilterBar';
import SheetsList from './SheetsList';
import ScheduleColumn from './ScheduleColumn';
import DayPicker from './DayPicker';
import Settings from './Settings';
import GlobalStyle from '../styles/global-style';

const Container: FC = () => {
  const { worksheets, currentSheet, instructorFilter, days, day, userTheme } = useSheets();
  const [mobileShowSheetPicker, setMobileShowSheetPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth > 1200)
        setMobileShowSheetPicker(false);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const instructorMatches = useMemo(() => {
    if (!days)
      return [];
    return days[day].lessons.map((x, i) => x.slice(0, 3).some(slot => slot.includes(instructorFilter)) ? i : -1).filter(x => x >= 0);
  }, [day, days, instructorFilter]);

  return (
    <ThemeProvider theme={ userTheme }>
      <ContainerMain>
        <GlobalStyle />
        <Nav toggleSettings={ () => setShowSettings(!showSettings) } />
        { showSettings && <Settings /> }
        { worksheets && <ContentMain>
          { !showSettings && <SheetsList mobileShow={ mobileShowSheetPicker } mobileClose={ () => setMobileShowSheetPicker(false) } /> }
          { ! showSettings && <ScheduleContainer $mobileShow={ !mobileShowSheetPicker }>
            <InstructorFilterBar />
            <CurrentSheet onClick={ () => setMobileShowSheetPicker(true) }>{ currentSheet ? currentSheet.a1SheetName.slice(1, -1) : 'No sheet selected' }</CurrentSheet>
            <DayPicker />
            { instructorMatches.length > 1 && <MultiNotify>Multiple matches for instructor found</MultiNotify> }
            <ScheduleColumn />
            { currentSheet && !instructorFilter.length && <ErrorNotify>No instructor name entered</ErrorNotify> }
            { currentSheet && instructorFilter && !instructorMatches.length && <ErrorNotify>No match for instructor found</ErrorNotify> }
          </ScheduleContainer> }
        </ContentMain> }
        { !worksheets && <PendingNotify>Waiting for Google...</PendingNotify> }
      </ContainerMain>
    </ThemeProvider>
  );
};

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  width: 100%;
`;

const ContentMain = styled.div`
  display: flex;
  overflow: hidden;
  flex-grow: 1;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

interface ScheduleContainerStyleProps {
  $mobileShow: boolean;
}

const ScheduleContainer = styled.div<ScheduleContainerStyleProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow: hidden;

  @media only screen and (max-width: 1200px) {
    align-items: center;
    ${ props => !props.$mobileShow && 'display: none;' }
  }
`;

const CurrentSheet = styled.h1`
  font-size: 3rem;
  background-color: ${ props => props.theme.colors.accentMain };
  margin: 0;
  width: 100%;
  padding: 8px 16px;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;

  @media only screen and (max-width: 1200px) {
    cursor: pointer;
  }

  @media only screen and (max-width: 800px) {
    text-align: center;
    font-size: 2rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 1200px) {
    pointer-events: none;
  }
`;

const PendingNotify = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 4rem;
`;

const ErrorNotify = styled.h1`
  background-color: ${ props => props.theme.colors.error };
  margin: 20px;
  padding: 2px 10px;
  border-radius: 4px;
  max-width: max-content;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
`;

const MultiNotify = styled(ErrorNotify)`
  background-color: ${ props => props.theme.colors.warn };
  margin: 4px 10px;
`;

export default Container;