import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  date: "",
  status: "",
  positionCount: "",
  positions: "",
  loyalty: "",
  sum: "",
  fullName: "",

  confirmationCodeValue: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    initialize(state, action) {
      return {
        ...state,

        id: action.payload.order.id,
        date: action.payload.order.data,
        status: action.payload.order.status,
        positionCount: action.payload.order.positionCount,
        positions: action.payload.order.positions,
        loyalty: action.payload.order.loyalty,
        sum: action.payload.order.sum,
        fullName: action.payload.order.fullName,
      };
    },
    resetForm() {
      return { ...initialState };
    },
    changeValue(state, action) {
      return { ...state, [action.payload.valueName]: action.payload.newValue };
    },
  },
});

export const { initialize, resetForm, changeValue } = formSlice.actions;
export default formSlice.reducer;
