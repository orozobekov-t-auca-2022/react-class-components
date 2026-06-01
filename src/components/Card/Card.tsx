import { useEffect } from 'react';
import styles from './Card.module.css';
import { Link, useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { select, unselect } from '../../store/pokemons/pokemonsSlice';
import type { RootState } from '../../store/store';
import type { IPokemon } from '../../type';
import {
  getEnglishFlavorText,
  useGetPokemonByUrlQuery,
  useGetPokemonSpeciesByNameQuery,
} from '../../services/pokemon';

const Card = (pokemon: IPokemon) => {
  const { id, name, url } = pokemon;
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? Number(page) : 1;
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemons.selectedPokemons
  );
  const { data: pokemonData, error: pokemonError } = useGetPokemonByUrlQuery(
    url
  );
  const { data: speciesData, error: speciesError } =
    useGetPokemonSpeciesByNameQuery(name);
  const isCurrentSelected = selectedPokemons.some(
    (selectedPokemon) => selectedPokemon.id === id
  );

  useEffect(() => {
    if (pokemonError) {
      console.error(pokemonError);
    }

    if (speciesError) {
      console.error(speciesError);
    }
  }, [pokemonError, speciesError]);

  const image = pokemonData?.sprites?.front_default ?? '';
  const description = speciesData
    ? getEnglishFlavorText(speciesData.flavor_text_entries)
    : '';

  return (
    <Link
      className={styles.card}
      style={{ textDecoration: 'none' }}
      to={`/?page=${currentPage}&details=${id}`}
    >
      <input
        type="checkbox"
        checked={isCurrentSelected}
        onClick={(e) => e.stopPropagation()}
        onChange={() =>
          !isCurrentSelected
            ? dispatch(select({ ...pokemon, description }))
            : dispatch(unselect(id))
        }
        className={styles.checkbox}
      />
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{description}</p>
    </Link>
  );
};

export default Card;
