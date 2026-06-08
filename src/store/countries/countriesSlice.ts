import { createSlice } from '@reduxjs/toolkit';
import type { CountriesState } from './types';

const initialState: CountriesState = {
  items: ['Spain', 'Italy', 'France', 'Germany', 'Sweden'],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
