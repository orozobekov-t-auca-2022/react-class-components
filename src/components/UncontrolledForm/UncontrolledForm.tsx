import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import type { UncontrolledFormProps } from "./types";
import styles from "./UncontrolledForm.module.css";

const UncontrolledForm = ({handleSubmit}: UncontrolledFormProps) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputBlock}>
        <label htmlFor="name">Name:</label>
        <Input name="name" id="name" type="text" placeholder="Name" />
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="age">Age:</label>
        <Input name="age" id="age" type="number" placeholder="Age" />
      </div>
        
      <div className={styles.inputBlock}>
        <label htmlFor="email">Email:</label>
        <Input name="email" id="email" type="email" placeholder="Email" />
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value={''}>Choose gender</option>
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </select>
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="terms">Accept terms and conditions</label>
        <Input type="checkbox" id="terms" placeholder="Accept terms and conditions" />
      </div>
        
      <Button type="submit">Submit uncontrolled form</Button>
    </form>
  )
}

export default UncontrolledForm