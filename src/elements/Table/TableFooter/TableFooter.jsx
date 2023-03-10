import cn from "classnames";
import styles from "./TableFooter.module.css";
import { node, string } from "prop-types";

TableFooter.propTypes = {
  className: string,
  children: node,
};

export function TableFooter({ className, children }) {
  const componentStyles = cn(styles._, className);
  return <div className={componentStyles}>{children}</div>;
}
