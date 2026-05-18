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
import {getPageCount, getPagesArray} from './utils/pages';
import Pagination from './components/Pagination';
import { Outlet, useSearchParams } from 'react-router';

const ERROR_MESSAGE =
  'It seems that something went wrong. We ask you to visit our site later';

const PAGE_LIMIT = 20;

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
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const page = Number(searchParams.get('page')) || 1;
  
  useEffect(() => {
    const loadData = async () => {
      const savedSearch = localStorage.getItem('searchQuery');
      if(savedSearch) {
        setData((prevData) => ({...prevData, searchPrompt: savedSearch}));
      }

      try{
        const currentPage = page ? page : 1;
	      const offset = (currentPage - 1) * PAGE_LIMIT;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_LIMIT}`);
        if(!response.ok) {
          throw new Error('Network error');
        }

        const data = await response.json();
        const pageCount = getPageCount(data.count, PAGE_LIMIT);
        const pages = getPagesArray(pageCount)    
	      setPagesArray(pages);

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
  }, [page]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({...prevData, searchPrompt: e.target.value }));
    setSearchParams({page: '1'})
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
      }
    }));
  }

  return(
    <ErrorBoundary>
      <div className={detailsId ? styles.splitLayout : styles.singleLayout}>
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
	        <Pagination pagesArray={pagesArray} currentPage={page ? page: 1} onChange={(actualPage: number) => {
            setData((prevData) => ({
		...prevData,
		isLoading: true
	    }));
			setSearchParams({page: `${actualPage}`})
            }} />
        </main>
        {detailsId &&
          <aside className={styles.sidebar} aria-label="details panel">
            <Outlet />
          </aside>
        }
      </div>
    </ErrorBoundary>
  )
}

export default App;
