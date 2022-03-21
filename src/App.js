import './App.css';
import React from 'react';
import SearchBar from './components/SearchBar';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기{' '}
      </h1>
      <SearchBar />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;
`;
export default App;
