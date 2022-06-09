import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    loadUser: (state, { payload }) => {
      state.data = payload;
      localStorage.setItem("token", payload.token);
    },
    signOut: (state) => {
      state.data = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loadUser, signOut } = userSlice.actions;

export default userSlice.reducer;
