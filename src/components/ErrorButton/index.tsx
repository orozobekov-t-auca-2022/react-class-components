import { Component, type ReactNode } from "react";
import styles from './ErrorButton.module.css';

interface IErrorButtonState{
  break: boolean,
}

class ErrorButton extends Component<unknown, IErrorButtonState> {
  state = {
    break: false,
  }

  render(): ReactNode {
    if(this.state.break) {
      throw new Error('Test error triggered!');
    }
    return (
      <section className={styles.errorButtonContainer}>
        <button className={styles.errorButton} onClick={() => this.setState({break: true})}>Error</button>
      </section>
    )
  }
}

export default ErrorButton;