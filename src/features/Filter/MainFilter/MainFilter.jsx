import { string, func, bool } from "prop-types";
import { Input } from "../../../elements/Input/Input.jsx";
import { Icon } from "../../../elements/icons/Icon.jsx";
import { Button } from "../../../elements/Button/Button.jsx";
import styles from "./MainFilter.module.css";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentPage,
  changeSearchbar,
  resetAllFilters,
} from "../../store/Filters/filtersSlice";
import { resetCheckedOrders } from "../../store/Orders/ordersSlice";
import { getLoadState, getSearchbarValue } from "../../store/selectors";

MainFilter.propTypes = {
  className: string,
  additionalFilterVisibility: bool,
  handleSwitchAdditionalFilter: func,
};

export function MainFilter({
  additionalFilterVisibility,
  handleSwitchAdditionalFilter,
  className,
}) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getLoadState);

  const searchbarValue = useSelector(getSearchbarValue);

  const handleChangeSearchbar = ({ target: { value } }) => {
    dispatch(changeSearchbar(value));
    dispatch(resetCheckedOrders());
    dispatch(changeCurrentPage(1));
  };

  const handleResetValue = () => {
    dispatch(changeSearchbar(""));
  };

  const handleResetAllFilters = () => {
    dispatch(resetAllFilters());
    dispatch(resetCheckedOrders());
  };
  const refreshIconStyles = cn({ [styles.loaderOn]: isLoading });
  const componentStyles = cn(styles._, className);
  return (
    <div className={componentStyles}>
      <div className={styles.leftBlock}>
        <div className={styles.searchbarWrapper}>
          <Input
            placeholder="Номер заказа или ФИО"
            prefix={<Icon type="search" />}
            value={searchbarValue}
            onReset={handleResetValue}
            onChange={handleChangeSearchbar}
          />
        </div>
        <Button
          icon="filter"
          onClick={handleSwitchAdditionalFilter}
          isSecondary={additionalFilterVisibility}
        >
          Фильтры
        </Button>
        <Button onClick={handleResetAllFilters}>Сбросить фильтры</Button>
      </div>
      <div>
        <Button icon="refresh" iconClassName={refreshIconStyles}>
          Загрузка
        </Button>
      </div>
    </div>
  );
}
