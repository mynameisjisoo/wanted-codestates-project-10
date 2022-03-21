import React from 'react';
import styled from 'styled-components';
import Suggestion from './Suggestion';

const SuggestionList = ({ data, loading }) => {
  return (
    <ListContainer>
      {<p>{loading ? '검색중' : '추천검색어'}</p>}
      {/* <p>추천검색어</p> */}
      <ul>
        {data?.map((el) => (
          <Suggestion key={el.key} keyword={el.name} />
        ))}
      </ul>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  background-color: #ffff;
  text-align: left;
  border-radius: 2rem;
  margin-top: 0.5rem;
  padding: 1.5rem 0;

  & > p {
    color: #788287;
    font-size: 0.8rem;
    margin-left: 1.5rem;
  }
`;
export default SuggestionList;
