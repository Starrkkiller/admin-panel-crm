import styles from "./Filter.module.css";
import { string } from "prop-types";
import { MainFilter } from "./MainFilter/MainFilter.jsx";
import { StatusFilterContainer } from "./AdditionalFilter/StatusFilter/StatusFilter.jsx";
import { DateFilter } from "./AdditionalFilter/DateFilter/DateFilter.jsx";
import { SumFilter } from "./AdditionalFilter/SumFilter/SumFilter.jsx";
import { Button } from "../../elements/Button/Button.jsx";
import { AdditionalFilter } from "./AdditionalFilter/AdditionalFilter.jsx";
import cn from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { activateAdditionalFilters } from "../store/Filters/filtersSlice";
import { changeCurrentPage } from "../store/Filters/filtersSlice";
import { resetCheckedOrders } from "../store/Orders/ordersSlice";

Filter.propTypes = {
  className: string,
};

export function Filter({ className }) {
  const firstPage = 1;
  const [additionalFilterVisibility, setAdditionalFilterVisibility] =
    useState(false);

  const dispatch = useDispatch();

  const handleActivateAdditionalFilters = () => {
    dispatch(changeCurrentPage(firstPage));
    dispatch(activateAdditionalFilters());
    dispatch(resetCheckedOrders());
  };

  const handleSwitchAdditionalFilter = () =>
    setAdditionalFilterVisibility(!additionalFilterVisibility);

  const componentStyles = cn(styles._, className);

  return (
    <div className={componentStyles}>
      <MainFilter
        additionalFilterVisibility={additionalFilterVisibility}
        handleSwitchAdditionalFilter={handleSwitchAdditionalFilter}
      />
      {additionalFilterVisibility && (
        <AdditionalFilter>
          <DateFilter />
          <StatusFilterContainer />
          <SumFilter />
          <Button onClick={handleActivateAdditionalFilters}>Применить</Button>
        </AdditionalFilter>
      )}
    </div>
  );
}
