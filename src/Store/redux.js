import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-reducer";
import inboxSlice from "./inbox-reducer";
import sentSlice from "./sent-reducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    inbox: inboxSlice.reducer,
    sent: sentSlice.reducer,
  },
});

export default store;
