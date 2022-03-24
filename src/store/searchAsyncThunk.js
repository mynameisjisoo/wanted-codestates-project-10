import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResults = createAsyncThunk(
  'search/fetchResult',
  async (keyword) => {
    if (!getDatatInLocal(keyword)) {
      const response = await axios.get(
        `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${keyword}`,
      );
      const fetchedData = response.data.slice(0, 10);
      setDataInLocal(keyword, fetchedData);
      return fetchedData;
    } else {
      return getDatatInLocal(keyword);
    }
  },
);

const setDataInLocal = (keyword, data) => {
  const obj = {
    value: data,
    expire: Date.now() + 3600000,
  };
  const objString = JSON.stringify(obj);
  window.localStorage.setItem(keyword, objString);
};

const getDatatInLocal = (keyword) => {
  const obj = JSON.parse(localStorage.getItem(keyword));
  if (!obj) return null;
  if (Date.now() > obj.expire) {
    window.localStorage.removeItem(keyword);
    return null;
  }
  return obj.value;
};

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResults.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });

    builder.addCase(fetchResults.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchResults.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
