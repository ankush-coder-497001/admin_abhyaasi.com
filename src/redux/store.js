import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import professionsReducer from "./slices/professionsSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    profession: professionsReducer,
    auth: authReducer,
  },
});

export default store;
