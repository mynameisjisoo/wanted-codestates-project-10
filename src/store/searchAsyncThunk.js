import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const instance = axios.create({
  baseURL: 'https://api.clinicaltrialskorea.com/',
  // headers: { 'Cache-Control': 'no-cache' },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false,
  }),
});
export const fetchResults = createAsyncThunk(
  'search/fetchResult',
  async (keyword, forceUpdate) => {
    // console.log(keyword);
    // console.log(forceUpdate);
    const response = await instance.get(
      `/api/v1/search-conditions/?name=${keyword}`,
      { forceUpdate, cache: true },
    );
    return response;
  },
);

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
      state.data = payload.data.slice(0, 10);
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
