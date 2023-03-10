import { ReactComponent as Abort } from "./assets/abort.svg";
import { ReactComponent as Bin } from "./assets/bin.svg";
import { ReactComponent as Checkmark } from "./assets/checkmark.svg";
import { ReactComponent as Dot } from "./assets/dot.svg";
import { ReactComponent as Filter } from "./assets/filter.svg";
import { ReactComponent as Locked } from "./assets/locked.svg";
import { ReactComponent as Moon } from "./assets/moon.svg";
import { ReactComponent as Pencil } from "./assets/pencil.svg";
import { ReactComponent as Refresh } from "./assets/refresh.svg";
import { ReactComponent as Search } from "./assets/search.svg";
import { ReactComponent as Sun } from "./assets/sun.svg";
import { ReactComponent as Arrow } from "./assets/v_arrow.svg";
import { ReactComponent as X_large } from "./assets/x-large.svg";
import { ReactComponent as X_medium } from "./assets/x-medium.svg";
import styles from "./Icon.module.css";
import cn from "classnames";

import { string } from "prop-types";

Icon.propTypes = {
  type: string,
  fill: string,
  stroke: string,
  className: string,
};

export function Icon({ className = "", type, fill = "", stroke = "" }) {
  switch (type) {
    case "abort":
      return (
        <Abort
          width="1rem"
          fill={fill}
          stroke={stroke}
          className={cn(className, styles.abort)}
        />
      );
    case "bin":
      return <Bin width="1rem" className={cn(className)} />;
    case "checkmark":
      return (
        <Checkmark
          width="1rem"
          fill={fill}
          stroke={stroke}
          className={cn(className)}
        />
      );
    case "dot":
      return (
        <Dot
          width="1rem"
          fill={fill}
          stroke={stroke}
          className={cn(className)}
        />
      );
    case "filter":
      return <Filter width="1rem" className={cn(className)} />;
    case "locked":
      return <Locked width="1rem" className={cn(className)} />;
    case "moon":
      return <Moon width="1rem" className={cn(className)} />;
    case "pencil":
      return <Pencil width="1rem" className={cn(className)} />;
    case "refresh":
      return <Refresh width="1rem" className={cn(className)} />;
    case "search":
      return <Search className={cn(styles._, styles.search, className)} />;
    case "sun":
      return <Sun width="1rem" className={cn(className)} />;
    case "arrow":
      return <Arrow width="1rem" className={cn(className)} />;
    case "x-large":
      return <X_large className={cn(styles._, styles.x, className)} />;
    case "x-medium":
      return <X_medium className={cn(styles._, styles.x, className)} />;
  }
}
