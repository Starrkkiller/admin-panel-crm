import { Checkbox } from "../../../../../elements/Checkbox/Checkbox.jsx";
import styles from "./StatusesSelector.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatusCheck } from "../../../../store/Filters/filtersSlice";
import { getCheckedStatuses } from "../../../../store/selectors";
import { statusNames } from "../../../../../App";

export function StatusesSelector() {
  const statuses = Object.keys(statusNames);
  const checkedStatuses = useSelector(getCheckedStatuses);

  const dispatch = useDispatch();

  const handleChangeStatusCheck = (status) => {
    dispatch(toggleStatusCheck(status));
  };

  let key = 0;

  return (
    <div className={styles._}>
      {statuses.map((el) => {
        key++;
        return (
          <div key={key} className={styles.item}>
            <Checkbox checked={checkedStatuses.includes(el)} />
            <span>{statusNames[el]}</span>
            <button
              className={styles.upperLayer}
              onClick={() => handleChangeStatusCheck(el)}
            />
          </div>
        );
      })}
    </div>
  );
}
