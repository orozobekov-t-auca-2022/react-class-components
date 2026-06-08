import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import styles from "./RHFForm.module.css";
import type { RHFFormProps } from "./types";

const RHFForm = ({handleRHFFormSubmit, handleRHFSubmit, register}: RHFFormProps) => {
  return (
    <form className={styles.form} onSubmit={handleRHFSubmit(handleRHFFormSubmit)}>
      <div className={styles.inputBlock}>
        <label htmlFor="rhf-name">Name:</label>
        <Input id="rhf-name" type="text" placeholder="Name" {...register("name")} />
      </div>

        <div className={styles.inputBlock}>
          <label htmlFor="rhf-age">Age:</label>
          <Input id="rhf-age" type="number" placeholder="Age" {...register("age")} />
        </div>
        
        <div className={styles.inputBlock}>
          <label htmlFor="rhf-email">Email:</label>
          <Input id="rhf-email" type="email" placeholder="Email" {...register("email")} />
        </div>

        <div className={styles.inputBlock}>
          <label htmlFor="rhf-gender">Gender:</label>
          <select id="rhf-gender" {...register("gender")} >
            <option value={''}>Choose gender</option>
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
          </select>
        </div>

        <div className={styles.inputBlock}>
          <label htmlFor="rhf-terms">Accept terms and conditions</label>
          <Input type="checkbox" id="rhf-terms" placeholder="Accept terms and conditions" {...register("acceptedTerms")} />
        </div>
        
        <Button type="submit">Submit RHF form</Button>
      </form>
  )
}

export default RHFForm;