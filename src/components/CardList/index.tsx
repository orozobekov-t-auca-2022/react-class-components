import styles from './CardList.module.css';
import Card from '../Card';

interface IPokemonsProps {
  results: {
    name: string;
    url: string;
  }[];
}

const CardList = (props: IPokemonsProps) => {
  const {results} = props;
  return(
    <>
    <section className="results">
        {results.length > 0 ? (
          <ul className={styles.list}>
            {results.map((pokemon) => (
              <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
          </ul>
        ) : (
          <p>No matching Pokemon found</p>
        )}
      </section>
    </>
  )
}

export default CardList;
