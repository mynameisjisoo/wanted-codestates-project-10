import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import SuggestionList from '../components/SuggestionList';

const Main = () => {
  const { loading, error, data } = useSelector((state) => state.search);
  console.log(loading);
  console.log(error);
  console.log(data);
  return (
    <>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <SearchBar />
      {(data || loading) && <SuggestionList data={data} loading={loading} />}
    </>
  );
};

export default Main;
