import styles from "./Input.module.css";
import { Button } from "../Button/Button";
import cn from "classnames";

import { func, string, bool, any } from "prop-types";
Input.propTypes = {
  value: string,
  onChange: func,
  onReset: func,
  onKeyDown: func,
  isIncorrect: bool,
  disabled: bool,
  label: string,
  placeholder: string,
  prefix: any,
  postfix: any,
  className: string,
  readOnly: bool,
};

const noop = () => {};

export function Input({
  value = "",
  onChange = noop,
  onReset = noop,
  onKeyDown = noop,
  isIncorrect = false,
  disabled = false,
  label,
  placeholder,
  prefix,
  postfix = null,
  className = "",
  readOnly = false,
}) {
  if (disabled && isIncorrect) {
    isIncorrect = false;
  }
  let postfixElement;
  if (postfix) {
    postfixElement = postfix;
  } else if (disabled) {
    postfixElement = <Button disabled icon="locked" />;
  } else if (value) {
    postfixElement = <Button isShort icon="x-medium" onClick={onReset} />;
  }
  const componentStyles = cn(styles._, className, {
    [styles.incorrect]: isIncorrect,
    [styles.disabled]: disabled,
  });

  return (
    <div className={componentStyles}>
      <label className={styles.label}>
        {label}
        <div className={styles.wrapper}>
          {prefix && <span>{prefix}</span>}
          <input
            className={styles.area}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={!!disabled}
            readOnly={!!readOnly}
            onKeyDown={onKeyDown}
          />
          {postfixElement}
        </div>
      </label>
    </div>
  );
}
