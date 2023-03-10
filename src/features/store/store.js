import orders from "./Orders/ordersSlice";
import filters from "./Filters/filtersSlice";
import form from "./Form/formSlice";
import loader from "./loader/loaderSlice";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  filters,
  orders,
  form,
  loader,
});

export default rootReducer;
