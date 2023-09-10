import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-reducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
