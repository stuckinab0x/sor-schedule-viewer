import { createGlobalStyle } from 'styled-components';


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
    background-color: ${ props => props.theme.colors.bgMain };
  }
`;

export default GlobalStyle;
