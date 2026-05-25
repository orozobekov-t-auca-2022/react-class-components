import { Link, useLocation } from 'react-router';
import styles from './Header.module.css';
import { useTheme } from '../../hooks/useTheme';
import Button from '../common/Button/Button';
import LightModeSvg from './assets/LightModeSvg';
import DarkModeSvg from './assets/DarkModeSvg';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <header className={styles.header}>
      <h1>Pokemon wiki</h1>
      <nav aria-label="main navigation">
        {currentLocation !== '/' ? (
          <Link className={styles.link} to="/">
            Home
          </Link>
        ) : (
          <span className={styles.link}>Home</span>
        )}
        {currentLocation !== '/about' ? (
          <Link className={styles.link} to="/about">
            About
          </Link>
        ) : (
          <span className={styles.link}>About</span>
        )}

        <Button className={styles.themeButton} onClick={() => toggleTheme()}>
          {theme === 'light' ? <LightModeSvg /> : <DarkModeSvg />}
        </Button>
      </nav>
    </header>
  );
};

export default Header;
