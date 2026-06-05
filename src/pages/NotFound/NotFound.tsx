import styles from './NotFound.module.css';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.message}>
        <h2>404 Not Found</h2>
        <p>There is no page that suits your search</p>
      </div>
      <div className={styles.backHome}>
        <Link to={'/'} className={styles.actionButton}>
          Back to the list
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
