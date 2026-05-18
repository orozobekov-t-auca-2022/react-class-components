import styles from './NotFound.module.css';
import {useNavigate} from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <section className={styles.notFound}>
      <div className={styles.message}>
	<h2>
	  404 Not Found 
	</h2>
	<p>
	  There is no page that suits your search
	</p>
      </div>
      <div className={styles.backHome}>
        <button className={styles.actionButton} onClick={handleClick}>
	  Back to the list
	</button>
      </div>
    </section>
  );
};

export default NotFound;
