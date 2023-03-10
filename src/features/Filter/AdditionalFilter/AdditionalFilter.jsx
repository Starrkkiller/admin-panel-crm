import styles from "./AdditionalFilter.module.css";
import cn from "classnames";

import { string, node } from "prop-types";
AdditionalFilter.propTypes = {
  className: string,
  children: node,
};

export function AdditionalFilter({ className, children }) {
  const AdditionalFilterStyles = cn(styles._, className);
  return <div className={AdditionalFilterStyles}>{children}</div>;
}
