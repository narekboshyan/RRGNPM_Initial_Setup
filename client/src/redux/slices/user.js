import { createSlice } from "@reduxjs/toolkit";
import { setItemToLocalStorage } from "utils";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    addUserData: (state, { payload }) => {
      const { token, ...rest } = payload || {};

      if (token) {
        setItemToLocalStorage("token", token);
      }
      // eslint-disable-next-line no-param-reassign
      state.user = rest;
    },
  },
});

export const { addUserData } = userSlice.actions;

export default userSlice.reducer;
