import {
  useEffect,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import styles from './App.module.css';
import CardList from './components/CardList';
import Search from './components/Search';
import Header from './components/Header';
import ErrorButton from './components/ErrorButton';
import ErrorList from './components/ErrorList';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import type { IState } from './type';

const ERROR_MESSAGE =
  'It seems that something went wrong. We ask you to visit our site later';

const App = () => {
  const [allPokemons, setAllPokemons] = useState<{ name: string; url: string }[]>([]);
  const [data, setData] = useState<IState>({
    pokemons: {
      count: 0,
      results:[],
    },
    isLoading: true,
    error: null,
    searchPrompt: '',
  });
  const {isLoading, error, pokemons} = data;

  useEffect(() => {
    const loadData = async () => {
      const savedSearch = localStorage.getItem('searchQuery');
      if(savedSearch) {
        setData((prevData) => ({...prevData, searchPrompt: savedSearch}));
      }

      try{
        const response = await fetch(`${import.meta.env.VITE_POKE_API_KEY}`);
        if(!response.ok) {
          throw new Error('Network error');
        }

        const data = await response.json();

        setTimeout(() => {
          setAllPokemons(data.results);
          const filteredResults = savedSearch
            ? data.results.filter((pokemon: { name: string }) =>
                pokemon.name.toLowerCase().includes(savedSearch.toLowerCase())
              )
            : data.results;

          setData((prevData) => ({
            ...prevData, 
            pokemons: {
              results: filteredResults,
              count: data.count,
            },
            isLoading: false,
          }));
        }, 3000);

      }catch(e) {
        if (e instanceof Error) {
          setData((prevData) => ({
            ...prevData,
            isLoading: false,
            // error: 
          }));
        } else {
          console.log(`An unexpected error has occured ${e}`);
          setData((prevData) => ({
            ...prevData,
            // error: 'An unexpected error occured',
            isLoading: false,
          }));
        }
      }
    }

    loadData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({...prevData, searchPrompt: e.target.value }));
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const trimmedSearch = data.searchPrompt.trim();
    setData((prevData) => ({...prevData, searchPrompt: trimmedSearch }));
    localStorage.setItem('searchQuery', trimmedSearch);
    filterPokemons(trimmedSearch);
  }

  const filterPokemons = (searchTerm: string) => {
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData((prevData) => ({
      ...prevData,
      pokemons: {
        ...prevData.pokemons,
        results: filtered,
        count: filtered.length,
      }
    }));
  }

  return(
    <ErrorBoundary>
      <main className={styles.container}>
        <Header />
        <Search
          value={data.searchPrompt}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        {isLoading ? (
          <Loader data-testid="loader" />
        ) : error ? (
          <ErrorList message={ERROR_MESSAGE} />
        ) : (
          <CardList results={pokemons.results} />
        )}
        <ErrorButton />
      </main>
    </ErrorBoundary>
  )
}

export default App;
