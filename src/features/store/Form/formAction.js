import { changeLoadStatus } from "../loader/loaderSlice";
import { changeOrder } from "../Orders/ordersSlice";

export default function updateOrder({ id, fullName, status }) {
  return (dispatch) => {
    dispatch(changeLoadStatus(true));
    setTimeout(() => {
      dispatch(
        changeOrder({
          id: id,
          status: status,
          fullName: fullName,
        })
      );
      dispatch(changeLoadStatus(false));
    }, 2000);
  };
}
