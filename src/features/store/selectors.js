export const getCheckedStatuses = (state) => state.filters.checkedStatuses;
export const getSearchbarValue = (state) => state.filters.searchbar;
export const getFormData = (state) => state.form;
export const getLoadState = (state) => state.loader;
export const getFormStatus = (state) => state.form.status;
export const getCheckedOrdersID = (state) => state.orders.checkedOrdersID;
export const getCheckedOrdersIDLength = (state) =>
  state.orders.checkedOrdersID.length;

const parseDate = (dateString) => {
  const dateAndTime = dateString.split(",");
  const [day, month, year] = dateAndTime[0].split(".").map((el) => +el);
  const date = new Date(year, month - 1, day);
  return date;
};

const getSorter = (key, isAscending) => {
  const direction = !isAscending ? 1 : -1;
  if (key === "positionCount" || key === "sum") {
    return (a, b) => {
      const symbol = "-";
      const firstElem = a[key] === symbol ? 0 : +a[key];
      const secondElem = b[key] === symbol ? 0 : +b[key];
      return firstElem > secondElem ? direction : -direction;
    };
  } else if (key === "date") {
    return (a, b) => {
      const firstElem = parseDate(a["data"]);
      const secondElem = parseDate(b["data"]);
      return firstElem > secondElem ? direction : -direction;
    };
  } else {
    return (a, b) => (a[key] > b[key] ? direction : -direction);
  }
};

const sortByKey = (key, isAscending, array) => {
  return array.sort(getSorter(key, isAscending));
};

export const getOrderByID = (id) => {
  return (state) => {
    return state.orders.allOrders.find((order) => {
      return order.id === id;
    });
  };
};

export const getFilteredOrdersByPageAndAllOrdersLength = (state) => {
  const {
    searchbar,
    curFilterDateFromValue,
    curFilterDateToValue,
    curCheckedStatuses,
    curFilterSumFromValue,
    curFilterSumToValue,
    isAdditionalFiltersActive,
    activeSorter,
    isAscending,
    pageLimit,
    currentPage,
  } = state.filters;

  let filteredOrders = state.orders.allOrders;
  if (searchbar) {
    filteredOrders = filteredOrders.filter((order) => {
      return (
        order.fullName.toLowerCase().includes(searchbar.toLowerCase().trim()) ||
        String(order.id).includes(searchbar.trim())
      );
    });
  }

  if (isAdditionalFiltersActive) {
    if (curFilterSumFromValue) {
      filteredOrders = filteredOrders.filter((order) => {
        if (order.sum !== "-") {
          return +order.sum >= +curFilterSumFromValue;
        }
        return 0 >= +curFilterSumFromValue;
      });
    }
    if (curFilterSumToValue) {
      filteredOrders = filteredOrders.filter((order) => {
        {
          if (order.sum !== "-") {
            return +order.sum <= +curFilterSumToValue;
          }
          return 0 <= +curFilterSumToValue;
        }
      });
    }

    if (curFilterDateFromValue) {
      filteredOrders = filteredOrders.filter(
        (order) => parseDate(order.data) >= parseDate(curFilterDateFromValue)
      );
    }
    if (curFilterDateToValue) {
      filteredOrders = filteredOrders.filter((order) => {
        return parseDate(order.data) <= parseDate(curFilterDateToValue);
      });
    }

    if (curCheckedStatuses.length > 0) {
      filteredOrders = filteredOrders.filter((order) =>
        curCheckedStatuses.includes(order.status)
      );
    }
  }

  const filteredAndSorted = sortByKey(activeSorter, isAscending, [
    ...filteredOrders,
  ]);

  const ordersByPage = filteredAndSorted.slice(
    pageLimit * (currentPage - 1),
    pageLimit * currentPage
  );

  return [ordersByPage, filteredAndSorted.length];
};
