import cn from "classnames";
import styles from "./TableBody.module.css";
import { string, node } from "prop-types";

TableBody.propTypes = {
  className: string,
  children: node,
};

export function TableBody({ className, children }) {
  const componentStyles = cn(styles._, className);
  return <div className={componentStyles}>{children}</div>;
}
