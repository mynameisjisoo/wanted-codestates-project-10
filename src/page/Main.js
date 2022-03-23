import React from 'react';
import styled from 'styled-components';
import Search from '../components/Search';

const Main = () => {
  return (
    <StyledMain>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <Search />
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
