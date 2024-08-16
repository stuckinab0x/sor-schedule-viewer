import { FC } from 'react';
import styled from 'styled-components';

interface NavProps {
  toggleSettings: () => void;
}

const Nav: FC<NavProps> = ({ toggleSettings }) => (
  <NavMain>
    <h1>D-Town Schedule</h1>
    <span onClick={ toggleSettings } className='material-symbols-outlined'>settings</span>
  </NavMain>
);

const NavMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4px 8px;
  background-color: #38384a;
  box-sizing: border-box;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  
  > h1 {
    margin: 0;
  }

  > span {
    cursor: pointer;
    height: 30px;
    width: 30px;
    font-size: 2rem;
    margin: 0 8px 0 0;
  }
`;

export default Nav;
