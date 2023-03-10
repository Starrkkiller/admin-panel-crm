import React from "react";
import { useState } from "react";
import cn from "classnames";
import styles from "./MyDropdown.module.css";
import { string, node, bool, func } from "prop-types";

MyDropdown.propTypes = {
  trigger: node,
  children: node,
  childrenClassName: string,
  triggerClassNameWithActiveTrigger: string,
  triggerClassName: string,
  externalVisibilityValue: bool,
  externalVisibilitySetter: func,
};

const mixHandlers = (firstHandler, secondHandler) => () => {
  firstHandler();
  if (secondHandler) {
    secondHandler();
  }
};

export function MyDropdown({
  trigger,
  children,
  triggerClassName,
  childrenClassName,
  triggerClassNameWithActiveTrigger,
  externalVisibilityValue = null,
  externalVisibilitySetter = () => {},
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown =
    externalVisibilityValue === null
      ? () => {
          setIsVisible(!isVisible);
        }
      : externalVisibilitySetter;

  const visibility =
    externalVisibilityValue === null ? isVisible : externalVisibilityValue;

  const mixedHandlers = mixHandlers(toggleDropdown, trigger.props.onClick);

  const TriggerElement = React.cloneElement(trigger, {
    onClick: mixedHandlers,
    className: cn(
      triggerClassName,
      { [triggerClassNameWithActiveTrigger]: isVisible },
      trigger.props.className
    ),
  });

  return (
    <div className={styles.trigger}>
      {TriggerElement}
      {visibility && (
        <div className={cn(childrenClassName, styles.overlay)}>{children}</div>
      )}
    </div>
  );
}
