import { FC } from 'react';
import styled from 'styled-components';
import { useSheets } from '../contexts/sheets-provider';

interface SheetsListProps {
  mobileShow: boolean;
  mobileClose: () => void;
}

const SheetsList: FC<SheetsListProps> = ({ mobileShow, mobileClose }) => {
  const { sheetNames, setSheet } = useSheets();


  return (
    <SheetsListMain $mobileShow={ mobileShow }>
      { sheetNames.flatMap(x => <h1 key={ x } onClick={ () => { setSheet(x); mobileClose(); } }>{ x.slice(1, -1) }</h1>) }
    </SheetsListMain>
  );
};

interface StyleProps {
  $mobileShow: boolean;
}

const SheetsListMain = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-width: max-content;
  min-width: max-content;
  padding: 4px;
  box-sizing: border-box;

  > h1 {
    cursor: pointer;
    background-color: grey;
    margin: 4px 2px;
    padding: 2px;
    border-radius: 4px;
    text-align: center;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 1200px) {
    max-width: unset;
    ${ props => !props.$mobileShow && 'display: none;' }

    > h1 {
      font-size: 1.2rem;
      padding: 4px 0px;
    }
  }
`;

export default SheetsList;
