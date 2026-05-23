import styles from './Button.module.css';
import type { IButton } from './types';

const Button = ({children, onClick, type, className}: IButton) => {
  return <button type={type} onClick={onClick} className={`${styles.button} ${className ?? ''}`}>
    {children}
  </button>
}

export default Button;