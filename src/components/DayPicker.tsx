import { FC } from 'react';
import styled from 'styled-components';
import { days as dayNames } from '../constants';
import { useSheets } from '../contexts/sheets-provider';

const shortNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const both = dayNames.map((x, i) => [x, shortNames[i]]);

const DayPicker: FC = () => {
  const { day, setDay } = useSheets();

  return (
    <Picker>
      { both.map((x, i) => <DayButton $selected={ dayNames.findIndex(name => name === x[0]) === day } key={ x[0] } onClick={ () => setDay(i) }>
          <h1>{ x[0] }</h1>
          <h1>{ x[1] }</h1>
        </DayButton>) }
    </Picker>
  );
};

const Picker = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 6px 4px 4px 4px;
  
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

const DayButton = styled.div<DayButtonStyle>`
  > h1 {
    padding: 2px 8px;
    border-radius: 4px;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    background-color: ${ props => props.$selected ? props.theme.colors.accentMain : props.theme.colors.inactive };
  }


  > :first-child {
    display: block;
    margin: 4px 5px;
  }

  > :last-child {
    display: none;
    font-size: 1.2rem;
    margin: 0 5px;
  }

  @media only screen and (max-width: 600px) {  
    > :first-child {
      display: none;
    }

    > :last-child {
      display: block;
    }
  }
`;

export default DayPicker;
