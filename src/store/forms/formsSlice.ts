import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormsHistoryState, NewFormState } from './types';

const initialState: FormsHistoryState = {
  submissions: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<NewFormState>) {
      state.submissions.push(action.payload);
    },
  },
});

export const { addUser } = formsSlice.actions;

export default formsSlice.reducer;
