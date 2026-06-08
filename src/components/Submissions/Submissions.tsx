import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import styles from './Submissions.module.css';
import type { NewFormState } from '../../store/forms/types';

const Submissions = () => {
  const submissions = useSelector(
    (state: RootState) => state.forms.submissions
  );

  return (
    <>
      {submissions.length > 0 ? (
        <div className={styles.history}>
          {submissions.toReversed().map((user: NewFormState, index) => (
            <div
              className={`${styles.card} ${index === 0 ? styles.latest : ''}`}
              key={user.id}
            >
              <img src={user.image ?? ''} alt="" />
              <h2>User {submissions.length - index}</h2>
              <h3>{user.name}</h3>
              <strong>{user.email}</strong>
              <p>{user.age} y.o.</p>
              <p>{user.gender}</p>
              <p>Country: {user.country}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>There are no users yet</p>
      )}
    </>
  );
};

export default Submissions;
