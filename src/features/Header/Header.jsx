import { Button } from "../../elements/Button/Button";
import styles from "./Header.module.css";
import { Switcher } from "./Switcher/Switcher";
import { useEffect, useState } from "react";
import cn from "classnames";
import switcherStyles from "./Switcher/Switcher.module.css";
export const LIGHT_THEME = "light";

import { string } from "prop-types";
import { MyDropdown } from "../../elements/Dropdown/MyDropdown";

Header.propTypes = {
  className: string,
};

export function Header({ className }) {
  const [theme, themeSetter] = useState(LIGHT_THEME);

  function changeTheme(theme = LIGHT_THEME) {
    themeSetter(theme);
  }

  function changeThemeApply(theme) {
    if (theme === LIGHT_THEME) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }

  useEffect(() => {
    changeThemeApply(theme);
  }, [theme]);

  let componentStyles = cn(styles._, className);

  const toggleElement = (
    <Button icon={theme === "light" ? "sun" : "moon"}>
      {theme === LIGHT_THEME ? "Светлая тема" : "Темная тема"}
    </Button>
  );

  return (
    <header className={componentStyles}>
      <div className={styles.text}>Список заказов</div>
      <MyDropdown trigger={toggleElement} childrenClassName={switcherStyles._}>
        <div className={styles.dropdownWrapper}>
          <Switcher currentTheme={theme} changeTheme={changeTheme} />
        </div>
      </MyDropdown>
    </header>
  );
}
