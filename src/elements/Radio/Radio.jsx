import styles from "./Radio.module.css";

export function Radio() {
  return (
    <div className={styles._}>
      <label>
        <input className={styles.iconArea} type="radio" />
        <svg
          className={styles.icon}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" stroke="none" />
        </svg>
      </label>
    </div>
  );
}
