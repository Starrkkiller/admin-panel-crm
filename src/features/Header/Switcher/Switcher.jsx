import { Button } from "../../../elements/Button/Button.jsx";
import styles from "./Switcher.module.css";
import cn from "classnames";
import { func, string } from "prop-types";
Switcher.propTypes = {
  currentTheme: string,
  changeTheme: func,
  className: string,
};

const noop = () => {};

export function Switcher({
  currentTheme = "light",
  changeTheme = noop,
  className,
}) {
  const changeToLightThemeHandler = () => changeTheme("light");
  const changeToDarkThemeHandler = () => changeTheme("dark");
  const SwitcherClasses = cn(styles._, styles.chooseTheme, className);

  return (
    <div className={SwitcherClasses}>
      <span className={styles.title}>Выберите тему</span>
      <Button
        isSecondary={currentTheme === "dark"}
        isShort
        isFullWidth
        icon="sun"
        onClick={changeToLightThemeHandler}
      >
        Светлая
      </Button>
      <Button
        isSecondary={currentTheme === "light"}
        isShort
        isFullWidth
        icon="moon"
        onClick={changeToDarkThemeHandler}
      >
        Темная
      </Button>
    </div>
  );
}
