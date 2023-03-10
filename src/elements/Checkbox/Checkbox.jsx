import styles from "./Checkbox.module.css";
import { bool, func } from "prop-types";

// ...

Checkbox.propTypes = {
  checked: bool,
  onChange: func,
};

const noop = () => {};

export function Checkbox({ checked = false, onChange = noop }) {
  return (
    <div className={styles._}>
      <label>
        <input
          className={styles.area}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <svg
          className={styles.icon}
          viewBox="0 0 16 16"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10L4.5 6L3 7L7 14L14.5 3.5V3L13 2L7 10Z" stroke="none" />
        </svg>
      </label>
    </div>
  );
}
