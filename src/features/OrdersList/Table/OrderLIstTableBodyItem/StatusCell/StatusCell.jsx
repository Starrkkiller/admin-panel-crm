import cn from "classnames";
import styles from "./StatusCell.module.css";
import { string } from "prop-types";
import { Icon } from "../../../../../elements/icons/Icon";

StatusCell.propTypes = {
  status: string,
};

const statusNames = {
  new: "Новый",
  calculating: "Рассчет",
  confirm: "Подтвержден",
  postponed: "Отложен",
  done: "Выполнен",
  canceled: "Отменен",
};

const ICON_SETTINGS_MAP = {
  new: {
    iconType: "dot",
    iconColor: "#FF8C56",
  },
  calculating: {
    iconType: "dot",
    iconColor: "#459DF5",
  },
  confirm: {
    iconType: "dot",
    iconColor: "#0FB864",
  },
  postponed: {
    iconType: "dot",
    iconColor: "#FF8C56",
  },
  done: {
    iconType: "checkmark",
    iconColor: "#0FB864",
  },
  canceled: {
    iconType: "abort",
    iconColor: "black",
  },
};

export function StatusCell({ status }) {
  const componentStyles = cn(styles._, {
    [styles.done]: status === "done",
    [styles.canceled]: status === "canceled",
  });
  if (document.body.classList.contains("dark")) {
    ICON_SETTINGS_MAP.canceled.iconColor = "white";
  } else {
    ICON_SETTINGS_MAP.canceled.iconColor = "black";
  }
  return (
    <div className={componentStyles}>
      <Icon
        type={ICON_SETTINGS_MAP[status].iconType}
        fill={ICON_SETTINGS_MAP[status].iconColor}
        stroke={ICON_SETTINGS_MAP[status].iconColor}
      />
      {statusNames[status]}
    </div>
  );
}
