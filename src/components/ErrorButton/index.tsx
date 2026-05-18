import { useState } from 'react';
import styles from './ErrorButton.module.css';

interface IErrorButtonState {
  break: boolean;
}

const ErrorButton = () => {
  const [errorState, setErrorState] = useState<IErrorButtonState>({
    break: false
  })

  if(errorState.break) {
    throw new Error('Test error triggered!');
  }
  return (
    <>
      <section className={styles.errorButtonContainer}>
        <button
          className={styles.errorButton}
          onClick={() => setErrorState({ break: true })}
        >
          Error
        </button>
      </section>
    </>
  )
}

export default ErrorButton;
