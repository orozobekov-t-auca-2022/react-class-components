import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import type { AppDispatch } from '../../store/store';
import { pokemonApi } from '../../services/pokemon';
import Button from '../common/Button/Button';
import styles from './RefreshButton.module.css';

const RefreshButton = () => {
  const [searchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const pokemonId = Number(detailsId);
  const hasValidDetailsId = detailsId !== null && !Number.isNaN(pokemonId);
  const dispatch = useDispatch<AppDispatch>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (!isUpdated) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setIsUpdated(false);
    }, 1200);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [isUpdated]);

  const handleRefresh = () => {
    setIsUpdated(false);
    setIsRefreshing(true);

    const tagsToInvalidate = [
      { type: 'Pokemon' as const, id: 'LIST' },
      ...(hasValidDetailsId
        ? [
            { type: 'Pokemon' as const, id: pokemonId },
            { type: 'PokemonSpecies' as const, id: String(pokemonId) },
          ]
        : []),
    ];

    dispatch(pokemonApi.util.invalidateTags(tagsToInvalidate));

    window.setTimeout(() => {
      setIsRefreshing(false);
      setIsUpdated(true);
    }, 700);
  };

  return (
    <Button
      className={`${styles.refreshButton} ${isUpdated ? styles.updated : ''}`}
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      {isRefreshing ? 'Refreshing...' : isUpdated ? 'Updated' : 'Refresh'}
    </Button>
  );
};

export default RefreshButton;