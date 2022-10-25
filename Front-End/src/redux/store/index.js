import { configureStore } from "@reduxjs/toolkit";
import { common, user } from "../slices";

export const store = configureStore({
  reducer: {
    common,
    user,
  },
});
