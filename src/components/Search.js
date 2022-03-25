import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from '../store/searchAsyncThunk';
import Suggestion from './Suggestion';

const Search = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.search);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const searchRef = useRef();
  const inputRef = useRef();

  let timer;
  const onInputFilled = (e) => {
    const keyword = e.target.value;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      if (keyword === '' || keyword === ' ') return;
      dispatch(fetchResults(keyword));
    }, 1000);
  };

  // To handle suggestions visiability
  useEffect(() => {
    setOpen(data ? true : false);
    setSelectedIdx(-1);
  }, [data]);

  // To handle search status
  useEffect(() => {
    if (data !== null && data.length === 0) {
      setStatus('추천 검색어 없음');
    } else if (loading) {
      setStatus('검색중...');
    } else if (data) {
      setStatus('추천검색어');
    } else if (error) {
      setStatus('요청 에러가 발생했습니다');
    }
  }, [data, loading, error]);

  // To handle move by arrow key
  const onArrowKeyDown = (e) => {
    if (!data) return;
    if (e.key === 'Enter') {
      openLink();
    } else if (e.key === 'ArrowUp' && selectedIdx - 1 >= 0) {
      setSelectedIdx(selectedIdx - 1);
    } else if (e.key === 'ArrowDown' && selectedIdx + 1 < data.length) {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  useEffect(() => {
    if (selectedIdx >= 0) {
      inputRef.current.value = data[selectedIdx].name;
    }
  }, [selectedIdx]);

  const openLink = () => {
    window.open(
      `https://clinicaltrialskorea.com/studies?condition=${inputRef.current.value}`,
    );
  };

  const handleFocus = (e) => {
    if (!searchRef.current.contains(e.target)) {
      setOpen(false);
    } else {
      inputRef.current.value && setOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleFocus);
  }, []);

  return (
    <div ref={searchRef}>
      <SearchBarContainer>
        <SearchInput>
          <BsSearch />
          <input
            ref={inputRef}
            onChange={onInputFilled}
            onKeyDown={onArrowKeyDown}
            autoFocus
            placeholder="질환명을 입력해 주세요."
          ></input>
        </SearchInput>
        <SearchButton onClick={openLink}>검색</SearchButton>
      </SearchBarContainer>

      {error ? (
        <SuggestionContainer>
          <p>{status}</p>
        </SuggestionContainer>
      ) : (
        (open || loading) && (
          <SuggestionContainer>
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
          </SuggestionContainer>
        )
      )}
    </div>
  );
};
const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  border-radius: 4rem;
  background-color: #ffff;
  justify-content: space-between;
`;

const SearchInput = styled.div`
  padding: 1.2rem;
  width: 100%;
  display: flex;
  align-items: center;

  input {
    border: none;
    outline: none;
    font: inherit;
    width: 100%;

    ::placeholder {
      color: #a7afb7;
    }
  }

  svg {
    margin: 0 0.5rem;
  }
`;

const SearchButton = styled.button`
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
  white-space: nowrap;
`;
const SuggestionContainer = styled.div`
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
export default Search;
