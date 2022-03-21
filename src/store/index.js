import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { searchSlice } from './searchAsyncThunk';

const reducer = combineReducers({
  search: searchSlice.reducer,
});

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
