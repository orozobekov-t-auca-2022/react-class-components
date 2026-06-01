import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Flyout.module.css';
import type { AppDispatch, RootState } from '../../store/store';
import Button from '../common/Button/Button';
import { unselectAll } from '../../store/pokemons/pokemonsSlice';
import { createPokemonCsv } from './utils/createPokemonCsv';
import { getEnglishFlavorText, pokemonApi } from '../../services/pokemon';

const ERROR_MESSAGE = 'Failed to prepare the download. Please try again later.';

const Flyout = () => {
  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemons.selectedPokemons
  );
  const selectedAmount = selectedPokemons.length;
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();
  const [downloadError, setDownloadError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloadError('');
    setIsDownloading(true);

    try {
      const selectedPokemonsWithDescriptions = await Promise.all(
        selectedPokemons.map(async (pokemon) => {
          if (pokemon.description) {
            return pokemon;
          }

          const species = await dispatch(
            pokemonApi.endpoints.getPokemonSpeciesByName.initiate(pokemon.name)
          ).unwrap();

          return {
            ...pokemon,
            description: getEnglishFlavorText(species.flavor_text_entries),
          };
        })
      );

      await createPokemonCsv(selectedPokemonsWithDescriptions, selectedAmount);
    } catch {
      setDownloadError(ERROR_MESSAGE);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <label>selected items: {selectedAmount}</label>
        <Button onClick={() => dispatch(unselectAll())}>Unselect all</Button>
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? 'Downloading...' : 'Download'}
        </Button>
        {downloadError && <p role="alert">{downloadError}</p>}
      </div>
    </div>
  );
};

export default Flyout;
