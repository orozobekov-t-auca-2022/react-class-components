import styles from './Input.module.css';
import type { InputProps } from './types';

const Input = ({ ...props }: InputProps) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
