import { FC } from 'react';
import styled from 'styled-components';
import { useSheets } from '../contexts/sheets-provider';

const Settings: FC = () => {
  const { userSettings: { defaultLoadCurrentDay, defaultLoadFirstSheet }, setUserSettings } = useSheets();

  return (
    <SettingsMain>
      <div>
        <h1>
          Always load first sheet: 
        </h1>
        <Button $on={ defaultLoadFirstSheet } onClick={ () => setUserSettings(oldState => ({ ...oldState, defaultLoadFirstSheet: !oldState.defaultLoadFirstSheet })) }>
          { defaultLoadFirstSheet ? 'Yes' : 'No' }
        </Button>
      </div>
      <div>
        <h1>
          Always load current day:
        </h1>
        <Button $on={ defaultLoadCurrentDay } onClick={ () => setUserSettings(oldState => ({ ...oldState, defaultLoadCurrentDay: !oldState.defaultLoadCurrentDay })) }>
        { defaultLoadCurrentDay ? 'Yes' : 'No' }
        </Button>
      </div>
    </SettingsMain>
  );
};

const SettingsMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    @media only screen and (max-width: 800px) {
      flex-direction: column;
    }
  }
`;

interface ButtonStyleProps {
  $on: boolean;
}

const Button = styled.h1<ButtonStyleProps>`
  background-color: ${ props => props.$on ? '#46466f' : 'grey' };
  margin: 0 8px;
  padding: 2px 8px;
  border-radius: 4px;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);

  cursor: pointer;
`;

export default Settings;
