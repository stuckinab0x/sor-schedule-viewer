import { FC } from 'react';
import Container from './components/Container';
import SheetsProvider from './contexts/sheets-provider';

const App:FC = () => (
  <SheetsProvider>
      <Container />
  </SheetsProvider>
);

export default App;
