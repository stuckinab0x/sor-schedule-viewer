import { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import Container from './components/Container';
import SheetsProvider from './contexts/sheets-provider';


const App:FC = () => (
  <>
    <GlobalStyle />
    <SheetsProvider>
      <Container />
    </SheetsProvider>
  </>
);

const GlobalStyle = createGlobalStyle`
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: white;
    font-family: -apple-system, -apple-system,  
      BlinkMacSystemFont, 'Segoe UI', Roboto,  
      Oxygen, Ubuntu, Cantarell, 'Open Sans',  
      'Helvetica Neue', sans-serif;
  }
  
  html, body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #141414;
  }
`;

export default App;
