import { useEffect, useState } from 'react';
import styles from './Card.module.css';
import { Link, useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { select, unselect } from '../../store/pokemons/pokemonsSlice';
import type {RootState} from '../../store/store';
import type { IPokemon } from '../../type';

const Card = (pokemon: IPokemon) => {
  const {id, name, url} = pokemon;
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? Number(page) : 1;
  const dispatch = useDispatch();
  const selectedPokemons = useSelector((state: RootState) => state.pokemons.selectedPokemons);
  const isCurrentSelected = selectedPokemons.some((selectedPokemon) => selectedPokemon.id === id);

  useEffect(() => {
    const loadData = async () => {
      const endpoint = url;
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Something wrong with response');
        }
        const data = await response.json();
        setImage(data.sprites.front_default);
      } catch (e) {
        console.log(e);
      }

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${name}`
        );
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        const pokemonDescription = data.flavor_text_entries.filter(
          (text: { language: { name: string } }) => text.language.name === 'en'
        )[0].flavor_text;
        setDescription(pokemonDescription);
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, [name, url]);

  return (
      <Link
        className={styles.card}
        style={{textDecoration: 'none'}}
        to={`/?page=${currentPage}&details=${id}`}
      >
          <input
        type='checkbox'
        checked={isCurrentSelected}
        onClick={(e) => e.stopPropagation()}
        onChange={() => !isCurrentSelected ? dispatch(select({...pokemon, description})) : dispatch(unselect(id))}
        className={styles.checkbox}
        />
        <h2>{name}</h2>
        <img src={image} alt={name} />
        <p>{description}</p>
      </Link>
  );
};

export default Card;
