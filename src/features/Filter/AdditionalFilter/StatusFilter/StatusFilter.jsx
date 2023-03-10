import styles from "./StatusFilter.module.css";
import cn from "classnames";
import statusSelectorStyles from "./StatusesSelector/StatusesSelector.module.css";
import { string } from "prop-types";
import { Input } from "../../../../elements/Input/Input";
import { Button } from "../../../../elements/Button/Button";
import { StatusesSelector } from "./StatusesSelector/StatusesSelector";
import { statusNames } from "../../../../App";
import { MyDropdown } from "../../../../elements/Dropdown/MyDropdown";
import { getCheckedStatuses } from "../../../store/selectors";
import { useSelector } from "react-redux";
StatusFilterContainer.propTypes = {
  className: string,
};
StatusFilter.propTypes = {
  className: string,
  checkedValues: string,
};

export function StatusFilterContainer({ className }) {
  const statuses = Object.keys(statusNames);
  const checkedStatuses = useSelector(getCheckedStatuses);

  let checkedValues = "";
  if (
    checkedStatuses.length === 0 ||
    checkedStatuses.length === Object.keys(statuses).length
  ) {
    checkedValues = "Любой";
  } else {
    let res = "";
    for (let elem of checkedStatuses) {
      res += statusNames[elem] + " ";
    }
    checkedValues = res;
  }

  return <StatusFilter className={className} checkedValues={checkedValues} />;
}

function StatusFilter({ className, checkedValues }) {
  const statusFilterStyles = cn(styles._, className);
  const buttonStyles = cn(styles.button, styles.themeIcon);

  const toggleElement = <Button icon="arrow" className={buttonStyles} />;

  const dropdownElement = (
    <MyDropdown
      trigger={toggleElement}
      childrenClassName={cn(
        statusSelectorStyles._,
        statusSelectorStyles.wrapper
      )}
      triggerClassNameWithActiveTrigger={styles.flipped}
    >
      <StatusesSelector />
    </MyDropdown>
  );

  return (
    <div className={statusFilterStyles}>
      <Input
        value={checkedValues}
        readOnly
        label="Статус заказа"
        postfix={dropdownElement}
      />
    </div>
  );
}
