import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import professionsReducer from "./slices/professionsSlice";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    profession: professionsReducer,
  },
});

export default store;
