import styles from "./Input.module.css"
import type { InputProps } from "./types";

const Input = ({value, onChange}: InputProps) => {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input;
