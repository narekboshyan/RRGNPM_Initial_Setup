import { configureStore } from "@reduxjs/toolkit";
import { common } from "../slices";

export const store = configureStore({
  reducer: {
    common,
  },
});
