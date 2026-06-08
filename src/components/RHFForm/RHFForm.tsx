import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import styles from './RHFForm.module.css';
import type { RHFFormProps } from './types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { getPasswordStrength } from '../../utils/passwordStrength';

const RHFForm = ({
  handleRHFFormSubmit,
  handleRHFSubmit,
  register,
  watch,
  formState,
}: RHFFormProps) => {
  const countries = useSelector((state: RootState) => state.countries.items);
  const password = watch('password') ?? '';
  const strength = getPasswordStrength(password);

  return (
    <form
      className={styles.form}
      onSubmit={handleRHFSubmit(handleRHFFormSubmit)}
    >
      <div className={styles.inputBlock}>
        <label htmlFor="rhf-name">Name:</label>
        <Input
          id="rhf-name"
          type="text"
          placeholder="Name"
          {...register('name')}
        />
        <p className={styles.error}>{formState.errors.name?.message}</p>
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="rhf-age">Age:</label>
        <Input
          id="rhf-age"
          type="number"
          placeholder="Age"
          {...register('age', {
            valueAsNumber: true,
          })}
        />
        <p className={styles.error}>{formState.errors.age?.message}</p>
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="rhf-email">Email:</label>
        <Input
          id="rhf-email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <p className={styles.error}>{formState.errors.email?.message}</p>
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="rhf-gender">Gender:</label>
        <select id="rhf-gender" {...register('gender')}>
          <option value={''}>Choose gender</option>
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </select>
        <p className={styles.error}>{formState.errors.gender?.message}</p>
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="rhf-terms">Accept terms and conditions</label>
        <input
          type="checkbox"
          id="rhf-terms"
          placeholder="Accept terms and conditions"
          {...register('acceptedTerms')}
        />
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="image">Upload image</label>
        <Input
          type="file"
          accept="image/png, image/jpeg"
          {...register('image')}
        />
        <p className={styles.error}>
          {formState.errors.image?.message as string}
        </p>
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="password">Password</label>
        <Input id="rhf-password" type="password" {...register('password')} />
        <ul>
          <li>{strength.hasNumber ? '1 number' : 'Missing 1 number'}</li>
          <li>
            {strength.hasUppercase ? '1 uppercase' : 'Missing 1 uppercase'}
          </li>
          <li>
            {strength.hasLowercase ? '1 lowercase' : 'Missing 1 lowercase'}
          </li>
          <li>
            {strength.hasSpecial
              ? '1 special character'
              : 'Missing 1 special character'}
          </li>
        </ul>
        <p className={styles.error}>{formState.errors.password?.message}</p>
        <label htmlFor="rhf-confirmPassword">Confirm password</label>
        <Input
          id="rhf-confirmPassword"
          type="password"
          {...register('confirmPassword', {
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
        />
        <p className={styles.error}>
          {formState.errors.confirmPassword?.message}
        </p>
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="country">Country:</label>
        <Input
          id="country"
          type="text"
          list="rhf-countries"
          placeholder="Start typing a country"
          {...register('country')}
        />
        <datalist id="rhf-countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <p className={styles.error}>{formState.errors.country?.message}</p>
      </div>

      <Button type="submit" disabled={!formState.isValid}>
        Submit RHF form
      </Button>
    </form>
  );
};

export default RHFForm;
