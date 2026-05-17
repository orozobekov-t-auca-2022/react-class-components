import { useEffect, useState } from 'react';
import styles from './Details.module.css';
import type { IAbility, IDetailsState, IForm } from './types';
import { useSearchParams } from 'react-router';

const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const detailsId = searchParams.get('details');
  const actualDetailsId = Number(detailsId);
  const [detailsInfo, setDetailsInfo] = useState<IDetailsState>({
    name: '',
    description: '',
    imgUrl: '',
    abilities: [],
    height: -1,
    id: detailsId ? parseInt(detailsId) : 1,
    forms: []
  });


  useEffect(() => {
    const loadDetailsInfo = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${actualDetailsId}`);
        if(!res.ok) {
          throw new Error('error');
        }

        const data = await res.json();
        setDetailsInfo((prevDetailsInfo) => ({
          ...prevDetailsInfo,
          name: data.name,
          imgUrl: data.sprites.front_default,
          abilities: data.abilities,
          id: data.id,
          height: data.height,
          forms: data.forms
        }))
      } catch (e) {
        console.log(e);
      }
    }
    if(!Number.isNaN(actualDetailsId)) {
      loadDetailsInfo();
    }
  }, [actualDetailsId]);

  const handleClose = () => {
    setSearchParams({page: `${page ?? 1}`})
  };

  return(
    <section className={styles.detailsPanel}>
      <h2>{detailsInfo.name}</h2>
      <img src={detailsInfo.imgUrl} alt={detailsInfo.name} />

      <div>
        <h3 className={styles.sectionTitle}>Abilities</h3>
        <ul className={styles.list}>
          {detailsInfo.abilities.map((ability: IAbility) => (
            <li key={`${detailsInfo.id}${ability.ability.name}`}>
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className={styles.sectionTitle}>Forms</h3>
        <ul className={styles.list}>
          {detailsInfo.forms.map((form: IForm) => (
            <li key={`${detailsInfo.id}${form.name}`}>{form.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className={styles.sectionTitle}>Height</h3>
        <p>{detailsInfo.height}</p>
      </div>

      <button onClick={handleClose}>close</button>
    </section>
  )
}

export default Details;
