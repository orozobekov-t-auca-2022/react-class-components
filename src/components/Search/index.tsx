import { Component, type ReactNode } from 'react';
import styles from './Search.module.css';
import type { ISearchProps } from './type';

class Search extends Component<ISearchProps> {
  constructor(props: ISearchProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <section className="search">
        <form className={styles.searchForm} onSubmit={this.props.onSubmit}>
          <div className={styles.input_field}>
            <label className={styles.label} htmlFor="search_input">
              Search pokemon
            </label>
            <input
              className={styles.input}
              value={this.props.value}
              onChange={this.props.onChange}
              id="search_input"
            />
          </div>
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
