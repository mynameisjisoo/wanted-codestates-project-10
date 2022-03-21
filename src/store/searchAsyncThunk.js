import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResults = createAsyncThunk(
  'search/fetchResult',
  async (keyword) => {
    const response = await axios.get(
      `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${keyword}`,
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
      state.data = payload.data;
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
