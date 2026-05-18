import { useEffect, useState } from 'react';
import styles from './Card.module.css';
import type { ICardProps, ICardState } from './type';
import { Link, useSearchParams } from 'react-router';

const Card = ({name, url}: ICardProps) => {
  const [pokemonInfo, setPokemonInfo] = useState<ICardState>({
    image: '',
    description: '',
    id: -1,
  });
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page');
  const currentPage = page ? Number(page) : 1;

  useEffect(() => {
    const loadData = async () => {
      const endpoint = url;
      try{
        const response = await fetch(endpoint);
        if(!response.ok) {
          throw new Error('Something wrong with response');
        }
        const data = await response.json();
        setPokemonInfo((prevInfo) => ({...prevInfo, image: data.sprites.front_default, id: data.id}));
      } catch(e) {
        console.log(e)
      };

      try{
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${name}`
        );
        if(!response.ok) {
          throw new Error('Something went wrong');
        };
        const data = await response.json();
        const pokemonDescription = data.flavor_text_entries.filter(
          (text: { language: { name: string } }) => text.language.name === 'en'
        )[0].flavor_text;
        setPokemonInfo((prevInfo) => ({...prevInfo, description: pokemonDescription}));
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, [name, url]);

  return(
    <>
      <Link to={`/?page=${currentPage}&details=${pokemonInfo.id}`} className={styles.card}>
        <h2>{name}</h2>
        <img src={pokemonInfo.image} alt={name} />
        <p>{pokemonInfo.description}</p>
      </Link>
    </>
  )
}

export default Card;
