import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: { initialCourse: null },
  reducers: {
    setInitialCourse: (state, action) => {
      state.initialCourse = action.payload;
    },
  },
});

export const { setInitialCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
