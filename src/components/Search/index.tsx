import styles from './Search.module.css';
import type { ISearchProps } from './type';

const Search = (props: ISearchProps) => {
  const {value, onSubmit, onChange} = props;
  return (
    <section className="search">
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <div className={styles.input_field}>
          <label className={styles.label} htmlFor="search_input">
            Search pokemon
          </label>
          <input
            className={styles.input}
            value={value}
            onChange={onChange}
            id="search_input"
          />
        </div>
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </section>
  )
}

export default Search;
