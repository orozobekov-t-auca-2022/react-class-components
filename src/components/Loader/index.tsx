import { Component, type ReactNode } from 'react';
import styles from './Loader.module.css';

class Loader extends Component {
  render(): ReactNode {
    return setTimeout(() => (
      <div className={styles.loader}>
      </div>
    ), 3000)
  }
}

export default Loader;