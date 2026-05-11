import { Component, type ReactNode } from 'react';
import styles from './Loader.module.css';

class Loader extends Component {
  render(): ReactNode {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader} data-testid="loader"></div>
      </div>
    );
  }
}

export default Loader;
