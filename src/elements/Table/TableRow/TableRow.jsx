import cn from "classnames";
import styles from "./TableRow.module.css";
import { string, node, func } from "prop-types";

const noop = () => {};
TableRow.propTypes = {
  className: string,
  children: node,
  onClick: func,
};

export function TableRow({ className, children, onClick = noop }) {
  const componentStyles = cn(styles._, className);
  return (
    <div className={componentStyles} onClick={onClick}>
      {children}
    </div>
  );
}
