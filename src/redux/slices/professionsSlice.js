import { createSlice } from "@reduxjs/toolkit";

export const professionsSlice = createSlice({
  name: "profession",
  initialState: {
    initialProfession: null,
  },
  reducers: {
    setInitialProfession: (state, action) => {
      state.initialProfession = action.payload;
    },
  },
});

export const { setInitialProfession } = professionsSlice.actions;

export default professionsSlice.reducer;
