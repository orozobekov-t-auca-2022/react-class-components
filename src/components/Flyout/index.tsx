import {useDispatch, useSelector} from 'react-redux';
import styles from './Flyout.module.css';
import type { RootState } from '../../store/store';
import Button from '../common/Button';
import { unselectAll } from '../../store/pokemons/pokemonsSlice';

const Flyout = () => {
  const selectedPokemons = useSelector((state: RootState) => state.pokemons.selectedPokemons);
  const selectedAmount = selectedPokemons.length;
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <label>selected items: {selectedAmount}</label>
        <Button onClick={() => dispatch(unselectAll())}>Unselect all</Button>
        <Button>Download</Button>
      </div>
    </div>
  );
}

export default Flyout;

