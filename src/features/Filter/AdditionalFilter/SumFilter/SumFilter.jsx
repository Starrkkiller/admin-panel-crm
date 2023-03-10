import styles from "./SumFilter.module.css";
import cn from "classnames";

import { string } from "prop-types";
import { Input } from "../../../../elements/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilterSumFromValue,
  changeFilterSumToValue,
} from "../../../store/Filters/filtersSlice";
SumFilter.propTypes = {
  className: string,
};

export function SumFilter({ className }) {
  const { filterSumFromValue, filterSumToValue } = useSelector(
    (state) => state.filters
  );

  const dispatch = useDispatch();

  const handleChangeFilterSumFromValue = ({ target: { value } }) => {
    dispatch(changeFilterSumFromValue(value));
  };
  const handleChangeFilterSumToValue = ({ target: { value } }) => {
    dispatch(changeFilterSumToValue(value));
  };
  const handleResetFilterSumFromValue = () => {
    dispatch(changeFilterSumFromValue(""));
  };
  const handleResetFilterSumToValue = () => {
    dispatch(changeFilterSumToValue(""));
  };

  const SumFilterStyles = cn(styles._, className);
  return (
    <div className={SumFilterStyles}>
      <Input
        placeholder="&#8381;"
        prefix="от"
        label="Сумма заказа"
        value={filterSumFromValue}
        onChange={handleChangeFilterSumFromValue}
        onReset={handleResetFilterSumFromValue}
      />
      <Input
        placeholder="&#8381;"
        prefix="до"
        value={filterSumToValue}
        onChange={handleChangeFilterSumToValue}
        onReset={handleResetFilterSumToValue}
      />
    </div>
  );
}
