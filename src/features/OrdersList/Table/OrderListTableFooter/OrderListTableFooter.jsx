import { DeletionApprover } from "./DeletionApprover/DeletionApprover";
import styles from "./OrderListTableFooter.module.css";
import { Button } from "../../../../elements/Button/Button";
import { TableFooter } from "../../../../elements/Table/TableFooter/TableFooter";
import { MyDropdown } from "../../../../elements/Dropdown/MyDropdown";
import { number } from "prop-types";
import { Pagination } from "./Pagination/Pagination";
import { useSelector } from "react-redux";
import { getCheckedOrdersIDLength } from "../../../store/selectors";
import { StatusChooser } from "./StatusChooser/StatusChooser";
import cn from "classnames";
import { useState } from "react";

OrderListTableFooter.propTypes = {
  ordersLength: number,
};

export function OrderListTableFooter({ ordersLength }) {
  const numberOfCheckedOrders = useSelector(getCheckedOrdersIDLength);

  const [isDeleteDropdownVisible, setIsDeleteDropdownVisible] = useState(false);

  const [isStatusChangeDropdownVisible, setIsStatusChangeDropdownVisible] =
    useState(false);
  const toggleStatusChangeDropdown = () => {
    setIsStatusChangeDropdownVisible(!isStatusChangeDropdownVisible);
    setIsDeleteDropdownVisible(false);
  };
  const toggleDeleteDropdown = () => {
    setIsDeleteDropdownVisible(!isDeleteDropdownVisible);
    setIsStatusChangeDropdownVisible(false);
  };
  const closeDeleteDropdown = () => {
    setIsDeleteDropdownVisible(false);
  };

  const deleteElements = (
    <Button icon="bin" size="short" isDanger={true} className={styles.button}>
      Удалить
    </Button>
  );

  const elementChooseStatus = (
    <Button
      icon="pencil"
      isSecondary={true}
      size="short"
      className={styles.button}
    >
      Изменить статус
    </Button>
  );
  const leftBlockStyle = cn(styles.block, {
    [styles.invisible]: numberOfCheckedOrders === 0,
  });

  return (
    <TableFooter className={styles._}>
      <div className={leftBlockStyle}>
        <span>Выбрано записей: {numberOfCheckedOrders}</span>
        <MyDropdown
          trigger={elementChooseStatus}
          childrenClassName={styles.statusChooser}
          externalVisibilitySetter={toggleStatusChangeDropdown}
          externalVisibilityValue={isStatusChangeDropdownVisible}
        >
          <StatusChooser
            externalVisibilitySetter={setIsStatusChangeDropdownVisible}
          />
        </MyDropdown>

        <MyDropdown
          trigger={deleteElements}
          childrenClassName={styles.dropdown}
          externalVisibilityValue={isDeleteDropdownVisible}
          externalVisibilitySetter={toggleDeleteDropdown}
        >
          <DeletionApprover
            numberOfCheckedOrders={numberOfCheckedOrders}
            textClassName={styles.text}
            close={closeDeleteDropdown}
          />
        </MyDropdown>
      </div>
      <div></div>
      <div className={styles.block}>
        <Pagination ordersLength={ordersLength} />
      </div>
    </TableFooter>
  );
}
