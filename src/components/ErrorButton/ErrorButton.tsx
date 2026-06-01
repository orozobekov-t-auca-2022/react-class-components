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
    <Button
          className={styles.errorButton}
          onClick={() => setErrorState({ break: true })}
        >
          Trigger Error
      </Button>
  );
};

export default ErrorButton;
