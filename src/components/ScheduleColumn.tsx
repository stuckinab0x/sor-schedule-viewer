import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useSheets } from '../contexts/sheets-provider';

const ScheduleColumn: FC = () => {
  const { day, days, instructorFilter } = useSheets();

  const instructorMatches = useMemo(() => {
    if (!days)
      return [];
    return days[day].lessons.map((x, i) => x.slice(0, 3).some(slot => slot.includes(instructorFilter)) ? i : -1).filter(x => x >= 0);
  }, [day, days, instructorFilter]);


  if (days && instructorFilter && instructorMatches.length)
  return (
    <ColumnMain>
      { days[day].times.map((x, i) =>
        <Tile key={ i }>
          <h1>{ x === '$emptyCell' ? '' : x }</h1>
          { instructorMatches.map(instructorIndex => <h1 key={ instructorIndex }>{ days[day].lessons[instructorIndex][i] === '$emptyCell' ? '' : days[day].lessons[instructorIndex][i] }</h1>) }
        </Tile>) }
    </ColumnMain>
  );
};

const ColumnMain = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 2px 10px;
  max-width: 1000px;
  box-sizing: border-box;

  @media only screen and (max-width: 1200px) {
    max-width: unset;
    width: 100%;
  }
`;

const Tile = styled.div`
  display: flex;

  > h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 50%;
    margin: 2px;
    border-radius: 6px;
    background-color: #212129;

    &:first-child {
      background-color: #46466f;
    }

    @media only screen and (max-width: 800px) {
      font-size: 1.2rem;
    }
  }
`;

export default ScheduleColumn;
