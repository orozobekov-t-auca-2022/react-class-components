import {useDispatch, useSelector} from 'react-redux';
import styles from './Flyout.module.css';
import type { RootState } from '../../store/store';
import Button from '../common/Button';
import { unselectAll } from '../../store/pokemons/pokemonsSlice';

const Flyout = () => {
  const selectedPokemons = useSelector((state: RootState) => state.pokemons.selectedPokemons);
  const selectedAmount = selectedPokemons.length;
  const dispatch = useDispatch();

  const handleDownload = () => {
    const finalString = selectedPokemons.map((selected) => `${selected.id},${selected.name},${selected.url}`).join('\n');
    
    const blob = new Blob([finalString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedAmount}_items.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <label>selected items: {selectedAmount}</label>
        <Button onClick={() => dispatch(unselectAll())}>Unselect all</Button>
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
}

export default Flyout;

