import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import type { UncontrolledFormProps } from './types';
import styles from './UncontrolledForm.module.css';
import type { RootState } from '../../store/store';
import { getPasswordStrength } from '../../utils/passwordStrength';

const UncontrolledForm = ({ handleSubmit, errors }: UncontrolledFormProps) => {
  const countries = useSelector((state: RootState) => state.countries.items);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputBlock}>
        <label htmlFor="name">Name:</label>
        <Input name="name" id="name" type="text" placeholder="Name" />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="age">Age:</label>
        <Input name="age" id="age" type="number" placeholder="Age" />
        {errors.age && <p className={styles.error}>{errors.age}</p>}
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="email">Email:</label>
        <Input name="email" id="email" type="email" placeholder="Email" />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="">Choose gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className={styles.error}>{errors.gender}</p>}
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="terms">Accept terms and conditions</label>
        <input type="checkbox" id="terms" name="acceptedTerms" />
        {errors.acceptedTerms && (
          <p className={styles.error}>{errors.acceptedTerms}</p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="image">Upload image</label>
        <Input type="file" accept="image/png, image/jpeg" name="image" />
        {errors.image && <p className={styles.error}>{errors.image}</p>}
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ul>
          <li>{strength.hasNumber ? '✓ 1 number' : '✗ Missing 1 number'}</li>
          <li>
            {strength.hasUppercase ? '✓ 1 uppercase' : '✗ Missing 1 uppercase'}
          </li>
          <li>
            {strength.hasLowercase ? '✓ 1 lowercase' : '✗ Missing 1 lowercase'}
          </li>
          <li>
            {strength.hasSpecial
              ? '✓ 1 special character'
              : '✗ Missing 1 special character'}
          </li>
        </ul>
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm password</label>
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="country">Country:</label>
        <Input
          id="country"
          name="country"
          list="countries"
          type="text"
          placeholder="Start typing a country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p className={styles.error}>{errors.country}</p>}
      </div>

      <Button type="submit">Submit uncontrolled form</Button>
    </form>
  );
};

export default UncontrolledForm;
