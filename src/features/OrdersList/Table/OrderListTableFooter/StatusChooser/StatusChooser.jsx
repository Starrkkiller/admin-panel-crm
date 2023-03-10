import { statusNames } from "../../../../../App";
import {
  changeOrders,
  resetCheckedOrders,
} from "../../../../store/Orders/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StatusChooser.module.css";
import { func } from "prop-types";

StatusChooser.propTypes = {
  externalVisibilitySetter: func,
};

export function StatusChooser({ externalVisibilitySetter }) {
  const statuses = Object.keys(statusNames);

  const checkedOrders = useSelector((state) => state.orders.checkedOrdersID);

  const dispatch = useDispatch();

  const handleChangeOrdersStatuses = (status) => {
    dispatch(resetCheckedOrders());
    dispatch(changeOrders({ newStatus: status, checkedOrders }));
    externalVisibilitySetter(false);
  };

  return (
    <>
      {statuses.map((status) => (
        <label className={styles.item} key={status}>
          <input
            type="radio"
            value={status}
            onChange={() => handleChangeOrdersStatuses(status)}
            className={styles.radio}
            id={status}
            name="radioGroup"
          />
          <div className={styles.statusName}>{statusNames[status]}</div>
        </label>
      ))}
    </>
  );
}
