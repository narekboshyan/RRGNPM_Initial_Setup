import { configureStore } from "@reduxjs/toolkit";
import { common, user, shared } from "../slices";

export const store = configureStore({
  reducer: {
    common,
    user,
    shared,
  },
});
