import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    changeLoadStatus(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
});

export const { changeLoadStatus } = loaderSlice.actions;

export default loaderSlice.reducer;
