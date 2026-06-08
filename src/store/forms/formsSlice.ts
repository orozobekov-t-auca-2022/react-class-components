import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormsHistoryState } from "./types";
import type { FormState } from "../../components/ModalForm/types";

const initialState: FormsHistoryState = {
  submissions: []
}

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<FormState>) {
      state.submissions.push(action.payload);
    },
  }
})

export const { addUser } = formsSlice.actions;

export default formsSlice.reducer;