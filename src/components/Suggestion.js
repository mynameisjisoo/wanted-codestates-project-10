import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

const Suggestion = ({ keyword }) => {
  return (
    <StyledLi>
      <BsSearch />
      <p>{keyword}</p>
    </StyledLi>
  );
};

const StyledLi = styled.li`
  margin: 0.2rem 0;
  padding: 0.4rem 1.5rem;
  cursor: pointer;
  p {
    display: inline-block;
    margin-left: 0.5rem;
  }

  &:hover {
    background-color: #e3f3ff;
  }
`;
export default Suggestion;
