import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

const Suggestion = ({ keyword }) => {
  return (
    <SuggestionItem
      href={`https://clinicaltrialskorea.com/studies?condition=${keyword}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BsSearch />
      <p>{keyword}</p>
    </SuggestionItem>
  );
};

const SuggestionItem = styled.a`
  display: block;
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
