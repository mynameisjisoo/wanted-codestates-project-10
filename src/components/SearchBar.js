import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from '../store/searchAsyncThunk';
import Suggestion from './Suggestion';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.search);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('검색중');
  const inputRef = useRef();

  let timer;
  const onInputFilled = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      dispatch(fetchResults(e.target.value, false));
    }, 1000);
  };

  //To handle ListContainer visiablity
  useEffect(() => {
    if (data) {
      setOpen(true);
    }
  }, [data]);

  //To handle search status
  useEffect(() => {
    if (data !== null && data.length === 0) {
      setStatus('추천 검색어 없음');
    } else if (loading) {
      setStatus('검색중');
    } else if (data) {
      setStatus('추천검색어');
    }
  }, [data, loading]);

  // ***키누를 때 마다 초기화됨
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const onSelectKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.value = data[selectedIdx].name;
    } else if (e.key === 'ArrowUp' && selectedIdx - 1 >= 0) {
      setSelectedIdx(selectedIdx - 1);
    } else if (e.key === 'ArrowDown' && selectedIdx + 1 < data.length) {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  const onSearch = () => {
    window.open(
      `https://clinicaltrialskorea.com/studies?condition=${inputRef.current.value}`,
    );
  };

  return (
    <>
      <SearchContainer>
        <InputWrapper>
          <BsSearch />
          <input
            onChange={onInputFilled}
            onKeyDown={onSelectKeyDown}
            ref={inputRef}
            autoFocus
            placeholder="질환명을 입력해 주세요."
          ></input>
        </InputWrapper>
        <ButtonWrapper onClick={onSearch}>검색</ButtonWrapper>
      </SearchContainer>
      {(open || loading) && (
        <ListContainer>
          <p>{status}</p>
          <ul>
            {data?.map((el, index) => (
              <Suggestion
                key={el.id}
                keyword={el.name}
                selected={index === selectedIdx}
              />
            ))}
          </ul>
        </ListContainer>
      )}
    </>
  );
};
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

    ::placeholder {
      color: #a7afb7;
    }
  }

  svg {
    margin-right: 1rem;
  }
`;

const ButtonWrapper = styled.button`
  background-color: #007be9;
  border-top-right-radius: 4rem;
  border-bottom-right-radius: 4rem;
  padding: 1.2rem 1.5rem;

  border: none;
  outline: none;
  color: #ffff;
  cursor: pointer;
  font: inherit;
  font-weight: bolder;
`;
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
export default SearchBar;
