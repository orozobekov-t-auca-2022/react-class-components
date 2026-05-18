import { Link } from 'react-router';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Pokemon wiki</h1>
      <nav aria-label="main navigation">
        <Link className={styles.link} to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
