import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import SuggestionList from '../components/SuggestionList';

const Main = () => {
  const { loading, error, data } = useSelector((state) => state.search);
  console.log(loading);
  console.log(error);
  console.log(data);
  return (
    <StyledMain>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <SearchBar />
      {(data !== null || loading) && (
        <SuggestionList data={data} loading={loading} />
      )}
    </StyledMain>
  );
};

const StyledMain = styled.main`
  padding-top: 5rem;
  h1 {
    margin-bottom: 1.5rem;
    font-weight: bold;
  }
`;

export default Main;
