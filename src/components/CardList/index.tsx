import styles from './CardList.module.css';
import Card from '../Card';
import type { IPokemon, IPokeResponse } from '../../type';


const CardList = (props: IPokeResponse) => {
  const { results } = props;
  return (
    <>
      <section className="results">
        {results.length > 0 ? (
          <ul className={styles.list}>
            {results.map((pokemon: IPokemon) => (
              <Card key={pokemon.id} {...pokemon} />
            ))}
          </ul>
        ) : (
          <p>No matching Pokemon found</p>
        )}
      </section>
    </>
  );
};

export default CardList;
