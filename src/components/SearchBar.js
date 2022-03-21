import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from '../store/searchAsyncThunk';

function SearchBar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchResults('암'));
  }, []);

  const { loading, error, data } = useSelector((state) => state.search);
  console.log(loading);
  console.log(error);
  console.log(data);

  const onSearch = (e) => {
    console.log(e.target.value);
    // setTimeout(() => {
    //   dispatch(fetchResults(e.target.value));
    // }, 2000);
  };
  return (
    <SearchContainer>
      <InputWrapper>
        <BsSearch />
        <input
          onChange={(e) => onSearch(e)}
          autoFocus
          placeholder="질환명을 입력해 주세요."
        ></input>
      </InputWrapper>
      <ButtonWrapper>
        <button>검색</button>
      </ButtonWrapper>
    </SearchContainer>
  );
}
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  border-radius: 4rem;
  background-color: #ffff;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  padding: 1.2rem;

  input {
    border: none;
    outline: none;
    font: inherit;
    width: inherit;
  }

  svg {
    margin-right: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  background-color: #357ae1;
  border-top-right-radius: 4rem;
  border-bottom-right-radius: 4rem;
  padding: 1.2rem 1.5rem;

  button {
    background-color: transparent;
    border: none;
    outline: none;
    color: #ffff;
    cursor: pointer;
    font: inherit;
    font-weight: bolder;
  }
`;
export default SearchBar;
