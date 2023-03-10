import { useEffect } from "react";
import { orders } from "../orders/orders";
import { Table } from "../../../elements/Table/Table";
import { OrderListTableHeader } from "./OrderLIstTableHeader/OrderListTableHeader";
import { TableBody } from "../../../elements/Table/TableBody/TableBody";
import { OrderListTableBodyItem } from "./OrderLIstTableBodyItem/OrderLIstTableBodyItem";
import { OrderListTableFooter } from "./OrderListTableFooter/OrderListTableFooter";
import styles from "./OrdersLIst.module.css";
import { Header } from "../../Header/Header";
import { Filter } from "../../Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  getCheckedOrdersID,
  getFilteredOrdersByPageAndAllOrdersLength,
} from "../../store/selectors";

import { getOrders, toggleOrderCheck } from "../../store/Orders/ordersSlice";
import { Form } from "../../Form/Form";

export function OrdersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getOrders(orders));
    }, 500);
  }, []);

  const checkedOrders = useSelector(getCheckedOrdersID);
  const handleChangeOrderCheck = (id) => {
    dispatch(toggleOrderCheck(id));
  };

  const [filteredOrders, ordersLength] = useSelector(
    getFilteredOrdersByPageAndAllOrdersLength
  );

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <Filter />
      <Table>
        <OrderListTableHeader allOrdersOnPage={filteredOrders} />
        <TableBody>
          {filteredOrders.map((order) => (
            <OrderListTableBodyItem
              key={order.id}
              isChecked={checkedOrders.includes(order.id)}
              onChangeCheck={() => {
                handleChangeOrderCheck(order.id);
              }}
              {...order}
            />
          ))}
        </TableBody>
        <OrderListTableFooter ordersLength={ordersLength} />
      </Table>
      <Form />
    </div>
  );
}
