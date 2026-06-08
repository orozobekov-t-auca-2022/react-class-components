import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import styles from "./Submissions.module.css";

const Submissions = () => {
  const submissions = useSelector((state: RootState) => state.forms.submissions);

  return (
    <>
      {
        submissions.length > 0 ?
        <div className={styles.history}>
          {submissions.map((user, index) => (
            <div className={styles.card} key={user.id}>
              <h2>User {index+1}</h2>
              <h3>{user.name}</h3>
              <strong>{user.email}</strong>
              <p>{user.age} y.o.</p>
              <p>{user.gender}</p>
            </div>
          ))}
        </div>
        : <p>There are no users yet</p>
      }
    </>
  )
}

export default Submissions;
