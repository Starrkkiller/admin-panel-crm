import { Input } from "../../../../elements/Input/Input.jsx";
import styles from "./DateFilter.module.css";
import cn from "classnames";

import { string } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilterDateFromValue,
  changeFilterDateToValue,
} from "../../../store/Filters/filtersSlice";
DateFilter.propTypes = {
  className: string,
};

export function DateFilter({ className }) {
  const { filterDateFromValue, filterDateToValue } = useSelector(
    (state) => state.filters
  );

  const dispatch = useDispatch();

  const handleChangeFilterDateFromValue = ({ target: { value } }) => {
    dispatch(changeFilterDateFromValue(value));
  };
  const handleChangeFilterDateToValue = ({ target: { value } }) => {
    dispatch(changeFilterDateToValue(value));
  };
  const handleResetFilterDateFromValue = () => {
    dispatch(changeFilterDateFromValue(""));
  };
  const handleResetFilterDateToValue = () => {
    dispatch(changeFilterDateToValue(""));
  };

  const DateFilterStyles = cn(styles._, className);
  return (
    <div className={DateFilterStyles}>
      <Input
        value={filterDateFromValue}
        prefix="c"
        placeholder="dd.mm.yyyy"
        label="Дата оформления"
        onChange={handleChangeFilterDateFromValue}
        onReset={handleResetFilterDateFromValue}
      />
      <Input
        value={filterDateToValue}
        prefix="по"
        placeholder="dd.mm.yyyy"
        onChange={handleChangeFilterDateToValue}
        onReset={handleResetFilterDateToValue}
      />
    </div>
  );
}
