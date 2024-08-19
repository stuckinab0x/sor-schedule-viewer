import { DefaultTheme } from 'styled-components';

const themes: DefaultTheme[] = [
  {
    name: 'Blue',
    colors: {
      accentMain: '#46466f',
      accentDark: '#212129',
      inactive: 'grey',
      bgMain: '#141414',
      nav: '#38384a',
      error: '#552727',
      warn: '#e89445',
    }
  }, 
  {
    name: 'Industrial',
    colors: {
      accentMain: '#e8a335',
      accentDark: '#383838',
      inactive: 'grey',
      bgMain: '#141414',
      nav: '#e8a335',
      error: '#552727',
      warn: '#734e4e',
    }
  },
  {
    name: 'Forest',
    colors: {
      accentMain: '#3b6239',
      accentDark: '#39322c',
      inactive: 'grey',
      bgMain: '#141414',
      nav: '#3b6239',
      error: '#552727',
      warn: '#734e4e',
    }
  },
];

export default themes;
