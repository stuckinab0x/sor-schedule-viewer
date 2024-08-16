import { FC } from 'react';
import styled from 'styled-components';
import { days as dayNames } from '../constants';
import { useSheets } from '../contexts/sheets-provider';

const DayPicker: FC = () => {
  const { day, setDay } = useSheets();

  return (
    <Picker>
      { dayNames.map((x, i) => <DayButton $selected={ dayNames.findIndex(name => name === x) === day } key={ x } onClick={ () => setDay(i) }>{ x }</DayButton>) }
    </Picker>
  );
};

const Picker = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
  
  > h1 {
    margin: 4px;
    text-align: center;

    @media only screen and (max-width: 800px) {
      font-size: 1.2rem;
    }
  }

  @media only screen and (max-width: 1200px) {
    justify-content: center;
  }
`;

interface DayButtonStyle {
  $selected: boolean;
}

const DayButton = styled.h1<DayButtonStyle>`
  margin: 0 5px;
  padding: 2px 8px;
  border-radius: 4px;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  background-color: ${ props => props.$selected ? '#46466f' : 'grey' };
`;

export default DayPicker;
