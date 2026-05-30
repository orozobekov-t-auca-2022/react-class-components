import { useDispatch, useSelector } from 'react-redux';
import styles from './Flyout.module.css';
import type { AppDispatch, RootState } from '../../store/store';
import Button from '../common/Button/Button';
import { unselectAll } from '../../store/pokemons/pokemonsSlice';
import { createPokemonCsv } from './utils/createPokemonCsv';
import { getEnglishFlavorText, pokemonApi } from '../../services/pokemon';

const Flyout = () => {
  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemons.selectedPokemons
  );
  const selectedAmount = selectedPokemons.length;
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const handleDownload = async () => {
    const selectedPokemonsWithDescriptions = await Promise.all(
      selectedPokemons.map(async (pokemon) => {
        if (pokemon.description) {
          return pokemon;
        }

        try {
          const species = await dispatch(
            pokemonApi.endpoints.getPokemonSpeciesByName.initiate(pokemon.name)
          ).unwrap();

          return {
            ...pokemon,
            description: getEnglishFlavorText(species.flavor_text_entries),
          };
        } catch {
          return pokemon;
        }
      })
    );

    await createPokemonCsv(selectedPokemonsWithDescriptions, selectedAmount);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <label>selected items: {selectedAmount}</label>
        <Button onClick={() => dispatch(unselectAll())}>Unselect all</Button>
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
};

export default Flyout;
