import { Button } from "../../../../../elements/Button/Button";
import { func, number, string } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrders,
  resetCheckedOrders,
} from "../../../../store/Orders/ordersSlice";
import styles from "./DeletionApprover.module.css";

DeletionApprover.propTypes = {
  numberOfCheckedOrders: number,
  textClassName: string,
  close: func,
};

export function DeletionApprover({
  numberOfCheckedOrders,
  textClassName,
  close,
}) {
  const checkedOrders = useSelector((state) => state.orders.checkedOrdersID);
  const dispatch = useDispatch();

  const handleDeleteChosenOrders = () => {
    dispatch(deleteOrders(checkedOrders));
    dispatch(resetCheckedOrders());
    close();
  };

  let question = getRightQuestion(numberOfCheckedOrders);

  return (
    <>
      <span className={textClassName}>{question}</span>
      <Button
        size="short"
        isFullWidth
        onClick={handleDeleteChosenOrders}
        className={styles.button}
      >
        Удалить
      </Button>
      <Button
        size="short"
        isSecondary={true}
        isFullWidth
        onClick={close}
        className={styles.button}
      >
        Отмена
      </Button>
    </>
  );
}

function getRightQuestion(numberOfCheckedOrders) {
  if (numberOfCheckedOrders <= 20) {
    if (numberOfCheckedOrders === 1) {
      return `Удалить ${numberOfCheckedOrders} запись?`;
    }
    if (numberOfCheckedOrders > 1 && numberOfCheckedOrders < 5) {
      return `Удалить ${numberOfCheckedOrders} записи?`;
    } else {
      return `Удалить ${numberOfCheckedOrders} записей?`;
    }
  } else {
    if (numberOfCheckedOrders % 10 === 1) {
      return `Удалить ${numberOfCheckedOrders} запись?`;
    }
    if (numberOfCheckedOrders % 10 > 1 && numberOfCheckedOrders % 10 < 5) {
      return `Удалить ${numberOfCheckedOrders} записи?`;
    } else {
      return `Удалить ${numberOfCheckedOrders} записей?`;
    }
  }
}
