import styles from './Details.module.css';
import { useSearchParams } from 'react-router';
import Loader from '../Loader/Loader';
import Button from '../common/Button/Button';
import {
  getEnglishFlavorText,
  useGetPokemonByIdQuery,
  useGetPokemonSpeciesByNameQuery,
} from '../../services/pokemon';

const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const detailsId = searchParams.get('details');
  const actualDetailsId = Number(detailsId);
  const shouldFetch = detailsId !== null && !Number.isNaN(actualDetailsId);
  const pokemonId = shouldFetch ? actualDetailsId : 1;

  const { data: detailsData, isLoading: isPokemonLoading } =
    useGetPokemonByIdQuery(pokemonId, {
      skip: !shouldFetch,
    });

  const { data: speciesData, isLoading: isSpeciesLoading } =
    useGetPokemonSpeciesByNameQuery(String(pokemonId), {
      skip: !shouldFetch,
    });

  const isLoading = isPokemonLoading || isSpeciesLoading;
  const detailsInfo = {
    name: detailsData?.name ?? '',
    description: speciesData
      ? getEnglishFlavorText(speciesData.flavor_text_entries)
      : '',
    imgUrl: detailsData?.sprites?.front_default ?? '',
    abilities: detailsData?.abilities ?? [],
    height: detailsData?.height ?? -1,
    id: detailsData?.id ?? pokemonId,
    forms: detailsData?.forms ?? [],
  };

  const handleClose = () => {
    setSearchParams({ page: `${page ?? 1}` });
  };

  return (
    <section className={styles.detailsPanel}>
      {!isLoading ? (
        <>
          <h2 className={styles.title}>{detailsInfo.name}</h2>
          <img
            className={styles.image}
            src={detailsInfo.imgUrl}
            alt={detailsInfo.name}
          />

          <div className={styles.blocks}>
            <div className={styles.abilitiesBlock}>
              <h3 className={styles.sectionTitle}>Abilities</h3>
              <ul className={styles.list}>
                {detailsInfo.abilities.map((ability) => (
                  <li key={`${detailsInfo.id}${ability.ability.name}`}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.formsBlock}>
              <h3 className={styles.sectionTitle}>Forms</h3>
              <ul className={styles.list}>
                {detailsInfo.forms.map((form) => (
                  <li key={`${detailsInfo.id}${form.name}`}>{form.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>
              Height: {detailsInfo.height}
            </h3>
          </div>

          <div className={styles.descriptionBlock}>
            <h3 className={styles.sectionTitle}>Description</h3>
            <p className={styles.description}>{detailsInfo.description}</p>
          </div>

          <Button className={styles.actionButton} onClick={handleClose}>
            close
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Details;
