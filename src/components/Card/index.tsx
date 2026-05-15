import { useEffect, useState } from 'react';
import styles from './Card.module.css';
import type { ICardProps, ICardState } from './type';

const Card = ({name, url}: ICardProps) => {
  const [pokemonInfo, setPokemonInfo] = useState<ICardState>({
    image: '',
    description: '',
    id: -1,
  });

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
          `${import.meta.env.VITE_POKE_SPECIE_API_KEY}/${name}`
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
  }, []);

  return(
    <>
      <div className={styles.card}>
        <h2>{name}</h2>
        <img src={pokemonInfo.image} alt={name} />
        <p>{pokemonInfo.description}</p>
      </div>
    </>
  )
}

export default Card;
