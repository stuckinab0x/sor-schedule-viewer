import { FC, useState } from 'react';
import styled from 'styled-components';
import { useSheets } from '../contexts/sheets-provider';

const InstructorFilterBar: FC = () => {
  const { instructorFilter, setInstructorFilter } = useSheets();
  const [showInput, setShowInput] = useState(false);


  return (
    <FilterBarMain>
        <h1>
          Lessons:
        </h1>
        { showInput ? 
          <>
            <InstructorFilter placeholder='Enter an instructor name' value={ instructorFilter } onChange={ e => setInstructorFilter(e.currentTarget.value) } />
            <span onClick={ () => setShowInput(false) } className='material-symbols-outlined'>done</span>
          </> : 
          <h1 onClick={ () => setShowInput(true) }>{ instructorFilter || 'None entered' }</h1>
        }
    </FilterBarMain>
  );
};

const FilterBarMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px 4px;
  width: 100%;
  box-sizing: border-box;

  > h1 {
    margin: 0;
    padding: 2px 8px;
  }

  span, h1:nth-child(2) {
      color: inherit;
      background-color: #46466f;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 8px;
      text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    }

  > span {
    font-size: 3rem;
    cursor: pointer;
    margin: 10px;
  }

  @media screen and (max-width: 800px) {
    justify-content: center;
  }
`;

const InstructorFilter = styled.input`
  font-family: inherit;
  font-size: 2rem;
  max-width: 90%;
`;

export default InstructorFilterBar;
