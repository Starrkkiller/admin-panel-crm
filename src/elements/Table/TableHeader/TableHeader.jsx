import cn from "classnames";
import styles from "./TableHeader.module.css";
import { string, node } from "prop-types";

TableHeader.propTypes = {
  className: string,
  children: node,
};

export function TableHeader({ className, children }) {
  const componentStyles = cn(styles._, className);
  return <div className={componentStyles}>{children}</div>;
}
