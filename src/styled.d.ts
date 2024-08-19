import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      accentMain: string;
      accentDark: string;
      inactive: string;
      bgMain: string;
      nav: string;
      error: string;
      warn: string;
    }
  }
}
