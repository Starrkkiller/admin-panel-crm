import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchbar: "",

  isAdditionalFiltersActive: false,

  filterDateFromValue: "",
  filterDateToValue: "",
  checkedStatuses: [],
  filterSumFromValue: "",
  filterSumToValue: "",

  curFilterDateFromValue: "",
  curFilterDateToValue: "",
  curCheckedStatuses: [],
  curFilterSumFromValue: "",
  curFilterSumToValue: "",

  activeSorter: "date",
  isAscending: true,

  pageLimit: 20,
  currentPage: 1,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeSearchbar(state, action) {
      return {
        ...state,
        searchbar: action.payload,
      };
    },

    changeFilterDateFromValue(state, action) {
      return {
        ...state,
        filterDateFromValue: action.payload,
      };
    },

    changeFilterDateToValue(state, action) {
      return {
        ...state,
        filterDateToValue: action.payload,
      };
    },

    toggleStatusCheck(state, action) {
      if (state.checkedStatuses.includes(action.payload)) {
        return {
          ...state,
          checkedStatuses: state.checkedStatuses.filter(
            (status) => status !== action.payload
          ),
        };
      }
      return {
        ...state,
        checkedStatuses: [...state.checkedStatuses, action.payload],
      };
    },

    changeFilterSumFromValue(state, action) {
      return {
        ...state,
        filterSumFromValue: action.payload,
      };
    },
    changeFilterSumToValue(state, action) {
      return {
        ...state,
        filterSumToValue: action.payload,
      };
    },

    activateAdditionalFilters(state) {
      return {
        ...state,
        isAdditionalFiltersActive: true,
        curFilterDateFromValue: state.filterDateFromValue,
        curFilterDateToValue: state.filterDateToValue,
        curCheckedStatuses: state.checkedStatuses,
        curFilterSumFromValue: state.filterSumFromValue,
        curFilterSumToValue: state.filterSumToValue,
      };
    },

    changeActiveSorter(state, action) {
      return {
        ...state,
        activeSorter: action.payload,
      };
    },

    changeSorterDirection(state) {
      return { ...state, isAscending: !state.isAscending };
    },

    resetAllFilters() {
      return initialState;
    },

    changeCurrentPage(state, action) {
      return { ...state, currentPage: action.payload };
    },
  },
});

export const {
  changeSearchbar,
  changeFilterDateFromValue,
  changeFilterDateToValue,
  toggleStatus,
  resetAllFilters,
  changeFilterSumFromValue,
  changeFilterSumToValue,
  toggleFiltersActivation,
  toggleStatusCheck,
  activateAdditionalFilters,
  changeActiveSorter,
  changeSorterDirection,
  changeCurrentPage,
} = filtersSlice.actions;

export default filtersSlice.reducer;
