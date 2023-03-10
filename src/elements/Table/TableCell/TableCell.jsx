import cn from "classnames";
import styles from "./TableCell.module.css";
import { string, node } from "prop-types";

TableCell.propTypes = {
  className: string,
  children: node,
};

export function TableCell({ className, children }) {
  const componentStyles = cn(styles._, className);
  return <div className={componentStyles}>{children}</div>;
}
