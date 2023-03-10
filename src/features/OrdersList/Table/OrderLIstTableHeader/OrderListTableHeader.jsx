import cn from "classnames";
import styles from "./OrderLIstTableHeader.module.css";
import rowStyles from "../RowMarkup.module.css";
import { TableHeader } from "../../../../elements/Table/TableHeader/TableHeader";
import { TableRow } from "../../../../elements/Table/TableRow/TableRow";
import { TableCell } from "../../../../elements/Table/TableCell/TableCell";
import { Checkbox } from "../../../../elements/Checkbox/Checkbox";
import { TableHeaderCell } from "../../../../elements/Table/TableHeaderCell/TableHeaderCell";
import { Icon } from "../../../../elements/icons/Icon";
import { array } from "prop-types";
import {
  changeActiveSorter,
  changeSorterDirection,
} from "../../../store/Filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAllOrdersOnPage,
  resetCheckedOrders,
} from "../../../store/Orders/ordersSlice";

OrderListTableHeader.propTypes = {
  allOrdersOnPage: array,
};

export function OrderListTableHeader({ allOrdersOnPage }) {
  const { activeSorter, isAscending } = useSelector((state) => state.filters);
  const { checkedOrdersID } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const createHandleChangeActiveSorter = (sorter) => () => {
    if (activeSorter === sorter) {
      dispatch(changeSorterDirection());
    } else {
      dispatch(changeActiveSorter(sorter));
    }
    dispatch(resetCheckedOrders());
  };

  const allOrdersIdOnPage = allOrdersOnPage.map((el) => el.id);

  const isAllOrdersChecked =
    allOrdersOnPage.length === checkedOrdersID.length &&
    checkedOrdersID.length !== 0;

  const handleCheckAllOrdersOnPage = () => {
    if (isAllOrdersChecked) {
      dispatch(checkAllOrdersOnPage([]));
    } else {
      dispatch(checkAllOrdersOnPage(allOrdersIdOnPage));
    }
  };

  return (
    <TableHeader>
      <TableRow>
        <TableCell className={rowStyles.checkbox}>
          <Checkbox
            checked={isAllOrdersChecked}
            onChange={() => handleCheckAllOrdersOnPage()}
          />
        </TableCell>

        <TableCell className={rowStyles.index}>#</TableCell>

        <TableHeaderCell
          className={cn(rowStyles.date, {
            [styles.activeSorter]: activeSorter === "date",
          })}
          onClick={createHandleChangeActiveSorter("date")}
        >
          Дата
          <Icon
            type="arrow"
            className={cn({
              [styles.flipped]: activeSorter === "date" && !isAscending,
            })}
          />
        </TableHeaderCell>

        <TableHeaderCell
          className={cn(rowStyles.status, {
            [styles.activeSorter]: activeSorter === "status",
          })}
          onClick={createHandleChangeActiveSorter("status")}
        >
          Статус
          <Icon
            type="arrow"
            className={cn({
              [styles.flipped]: activeSorter === "status" && !isAscending,
            })}
          />
        </TableHeaderCell>

        <TableHeaderCell
          className={cn(rowStyles.numberOfPositions, {
            [styles.activeSorter]: activeSorter === "positionCount",
          })}
          onClick={createHandleChangeActiveSorter("positionCount")}
        >
          Позиций
          <Icon
            type="arrow"
            className={cn({
              [styles.flipped]:
                activeSorter === "positionCount" && !isAscending,
            })}
          />
        </TableHeaderCell>

        <TableHeaderCell
          className={cn(rowStyles.sum, {
            [styles.activeSorter]: activeSorter === "sum",
          })}
          onClick={createHandleChangeActiveSorter("sum")}
        >
          Сумма
          <Icon
            type="arrow"
            className={cn({
              [styles.flipped]: activeSorter === "sum" && !isAscending,
            })}
          />
        </TableHeaderCell>

        <TableCell className={rowStyles.name}>ФИО покупателя</TableCell>
      </TableRow>
    </TableHeader>
  );
}
