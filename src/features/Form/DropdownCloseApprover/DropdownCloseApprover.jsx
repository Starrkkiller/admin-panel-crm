import { Button } from "../../../elements/Button/Button";
import styles from "./DropdownCloseApprover.module.css";

import { func } from "prop-types";

DropdownCloseApprover.propTypes = {
  onDropdownClose: func,
  onModalClose: func,
};

export function DropdownCloseApprover({ onDropdownClose, onModalClose }) {
  return (
    <>
      <span>Есть несохраненные изменения</span>
      <Button
        className={styles.button}
        isFullWidth
        size="short"
        onClick={onModalClose}
      >
        Сбросить
      </Button>
      <Button
        className={styles.button}
        isFullWidth
        size="short"
        isSecondary={true}
        onClick={onDropdownClose}
      >
        Остаться
      </Button>
    </>
  );
}
