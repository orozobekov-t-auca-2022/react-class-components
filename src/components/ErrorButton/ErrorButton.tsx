import { useState } from 'react';
import styles from './ErrorButton.module.css';
import Button from '../common/Button/Button';

interface IErrorButtonState {
  break: boolean;
}

const ErrorButton = () => {
  const [errorState, setErrorState] = useState<IErrorButtonState>({
    break: false,
  });

  if (errorState.break) {
    throw new Error('Test error triggered!');
  }

  return (
    <>
      <section className={styles.errorButtonContainer}>
        <Button
          className={styles.errorButton}
          onClick={() => setErrorState({ break: true })}
        >
          Error
        </Button>
      </section>
    </>
  );
};

export default ErrorButton;
