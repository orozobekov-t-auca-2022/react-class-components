import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const Submissions = () => {
  const submissions = useSelector((state: RootState) => state.forms.submissions);

  console.log(Array.isArray(submissions))
  return (
    <>
      {
        submissions.length > 0 ?
        <div>
          {submissions.map((user, index) => (
            <div key={user.id}>
              <h2>User {index+1}</h2>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{user.age}</li>
              <li>{user.gender}</li>
            </div>
          ))}
        </div> :
        <div>
          There are no users yet.
        </div>
      }
    </>
  )
}

export default Submissions;
