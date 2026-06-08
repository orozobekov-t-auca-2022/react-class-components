import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import styles from './Search.module.css';
import type { ISearchProps } from './type';

const Search = (props: ISearchProps) => {
  const { value, onSubmit, onChange } = props;
  return (
    <section className="search">
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <div className={styles.input_field}>
          <label className={styles.label} htmlFor="search_input">
            Search pokemon
          </label>
          <Input value={value} onChange={onChange} />
        </div>
        <Button className={styles.button} type="submit">
          Search
        </Button>
      </form>
    </section>
  );
};

export default Search;
