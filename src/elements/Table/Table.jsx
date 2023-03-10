import cn from "classnames";
import styles from "./Table.module.css";

import { string, node } from "prop-types";

Table.propTypes = {
  className: string,
  children: node,
};

export function Table({ className, children }) {
  const componentStyles = cn(styles._, className);
  return <div className={componentStyles}>{children}</div>;
}
