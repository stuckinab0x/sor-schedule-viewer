import { FC } from 'react';
import styled from 'styled-components';
import { useSheets } from '../contexts/sheets-provider';
import themes from '../styles/themes';

const themeNames = themes.map(x => x.name);

const Settings: FC = () => {
  const { userSettings: { defaultLoadCurrentDay, defaultLoadFirstSheet, theme }, setUserSettings } = useSheets();

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
      <div>
        <h1>
          Theme:
        </h1>
        { themeNames.map(x => (
          <Button $on={ theme === x } onClick={ () => setUserSettings(oldState => ({ ...oldState, theme: x })) }>
            { x }
          </Button>
        )) }
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
    margin: 6px 0;

    h1 {
      margin: 8px;
    }

    @media only screen and (max-width: 800px) {
      flex-direction: column;
    }
  }
`;

interface ButtonStyleProps {
  $on: boolean;
}

const Button = styled.h1<ButtonStyleProps>`
  background-color: ${ props => props.$on ? props.theme.colors.accentMain : props.theme.colors.inactive };
  padding: 2px 8px;
  border-radius: 4px;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);

  cursor: pointer;
`;

export default Settings;
