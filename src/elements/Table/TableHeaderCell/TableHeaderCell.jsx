import cn from "classnames";
import styles from "./TableHeaderCell.module.css";
import { string, node, any } from "prop-types";

TableHeaderCell.propTypes = {
  className: string,
  children: node,
  props: any,
};

export function TableHeaderCell({ className, children, ...props }) {
  const componentStyles = cn(styles._, className);
  return (
    <button className={componentStyles} {...props}>
      {children}
    </button>
  );
}
