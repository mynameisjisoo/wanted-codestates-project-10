import './App.css';
import React from 'react';
import styled from 'styled-components';
import Main from './page/Main';

function App() {
  return (
    <Container>
      <Main />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;
`;
export default App;
