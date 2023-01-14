import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducers";

const store = configureStore({
  reducer: searchReducer,
});

export default store;
