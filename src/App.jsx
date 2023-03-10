import "./App.css";
import { OrdersList } from "./features/OrdersList/Table/OrdersList";
import { Provider } from "react-redux";
import store from "./features/index";

export const statusNames = {
  new: "Новый",
  calculating: "Рассчет",
  confirm: "Подтвержден",
  postponed: "Отложен",
  done: "Выполнен",
  canceled: "Отменен",
};

function App() {
  return (
    <Provider store={store}>
      <OrdersList />
    </Provider>
  );
}

export default App;
