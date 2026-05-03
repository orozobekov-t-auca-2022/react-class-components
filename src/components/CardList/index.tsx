import { Component, type ReactNode } from "react";
import styles from './CardList.module.css';
import Card from "../Card";

interface IPokemonsProps{
  results: {
    name: string,
    url: string
  }[],
}

class CardList extends Component<IPokemonsProps> {
  render(): ReactNode {
    return <section className='results'>
      <ul className={styles.list}>
        {this.props.results.map(pokemon => (
          <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </ul>
    </section>
  }
}

export default CardList;