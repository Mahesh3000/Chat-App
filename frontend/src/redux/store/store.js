import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducers";

// Combine all reducers (add more as needed)
const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers can go here
  },
});

export default store;
