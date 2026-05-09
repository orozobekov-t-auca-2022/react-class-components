import { Component, type ReactNode } from 'react';
import styles from './CardList.module.css';
import Card from '../Card';

interface IPokemonsProps {
  results: {
    name: string;
    url: string;
  }[];
}

class CardList extends Component<IPokemonsProps> {
  render(): ReactNode {
    return (
      <section className="results">
        {this.props.results.length > 0 ? 
          <ul className={styles.list}>
            {this.props.results.map((pokemon) => (
              <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
          </ul> : 
          <p>No matching Pokemon found</p>
        }
      </section>
    );
  }
}

export default CardList;
