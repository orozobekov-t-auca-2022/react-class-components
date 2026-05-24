import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import styles from './App.module.css';
import CardList from './components/CardList';
import Search from './components/Search';
import ErrorButton from './components/ErrorButton';
import ErrorList from './components/ErrorList';
import Loader from './components/Loader';
import type { IPokemon, IState } from './type';
import { getPageCount, getPagesArray } from './utils/pages';
import Pagination from './components/Pagination';
import { Outlet, useSearchParams } from 'react-router';
import useLocalStorage from './hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import Flyout from './components/Flyout';

const ERROR_MESSAGE =
  'It seems that something went wrong. We ask you to visit our site later';

const PAGE_LIMIT = 20;

const getPokemonIdFromUrl = (url: string) => {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? Number(match[1]) : -1;
};

const App = () => {
  const [allPokemons, setAllPokemons] = useState<IPokemon[]>([]);
  const [data, setData] = useState<IState>({
    pokemons: {
      count: 0,
      results: [],
    },
    isLoading: true,
    error: null,
  });
  const { isLoading, error, pokemons } = data;
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedPrompt, , savePrompt] = useLocalStorage('searchQuery', '');
  const [searchPrompt, setSearchPrompt] = useState(savedPrompt);
  const detailsId = searchParams.get('details');
  const page = Number(searchParams.get('page')) || 1;

  const selectedPokemons = useSelector((state: RootState) => state.pokemons.selectedPokemons);

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentPage = page ? page : 1;
        const offset = (currentPage - 1) * PAGE_LIMIT;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_LIMIT}`
        );
        if (!response.ok) {
          throw new Error('Network error');
        }

        const data = await response.json();
        const hasSearchTerm = savedPrompt.trim().length > 0;
        const resultsWithIds = data.results.map((pokemon: IPokemon) => ({
          ...pokemon,
          id: getPokemonIdFromUrl(pokemon.url),
        }));

        setTimeout(() => {
          setAllPokemons(resultsWithIds);
          const filteredResults = hasSearchTerm
            ? resultsWithIds.filter((pokemon: { name: string }) =>
                pokemon.name
                  .toLowerCase()
                  .includes(savedPrompt.trim().toLowerCase())
              )
            : resultsWithIds;
          const totalCount = hasSearchTerm ? filteredResults.length : data.count;

          setPagesArray(getPagesArray(getPageCount(totalCount, PAGE_LIMIT)));

          setData((prevData) => ({
            ...prevData,
            pokemons: {
              results: filteredResults,
              count: totalCount,
            },
            isLoading: false,
          }));
        }, 3000);
      } catch (e) {
        if (e instanceof Error) {
          setData((prevData) => ({
            ...prevData,
            isLoading: false,
            error: ERROR_MESSAGE,
          }));
        } else {
          console.log(`An unexpected error has occured ${e}`);
          setData((prevData) => ({
            ...prevData,
            error: ERROR_MESSAGE,
            isLoading: false,
          }));
        }
      }
    };

    loadData();
  }, [page, savedPrompt]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPrompt(e.target.value);
    setSearchParams({ page: '1' });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const trimmedSearch = searchPrompt.trim();
    setSearchPrompt(trimmedSearch);
    savePrompt(trimmedSearch);
    filterPokemons(trimmedSearch);
  };

  const filterPokemons = (searchTerm: string) => {
    const normalizedSearchTerm = searchTerm.trim();
    const hasSearchTerm = normalizedSearchTerm.length > 0;
    const filtered = hasSearchTerm
      ? allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(normalizedSearchTerm.toLowerCase())
        )
      : allPokemons;
    const totalCount = hasSearchTerm ? filtered.length : pokemons.count;

    setPagesArray(getPagesArray(getPageCount(totalCount, PAGE_LIMIT)));
    setData((prevData) => ({
      ...prevData,
      pokemons: {
        ...prevData.pokemons,
        results: filtered,
        count: totalCount,
      },
    }));
  };

  return (
    <>
      <div className={detailsId ? styles.splitLayout : styles.singleLayout}>
        <main className={styles.container}>
          <Search
            value={searchPrompt}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          {isLoading ? (
            <Loader data-testid="loader" />
          ) : error ? (
            <ErrorList message={ERROR_MESSAGE} />
          ) : (
            <>
              <CardList {...pokemons} />
              {pagesArray.length > 0 && (
                <Pagination
                  pagesArray={pagesArray}
                  currentPage={page ? page : 1}
                  onChange={(actualPage: number) => {
                    setData((prevData) => ({
                      ...prevData,
                      isLoading: true,
                    }));
                    setSearchParams({ page: `${actualPage}` });
                  }}
                />
              )}
            </>
          )}
          <ErrorButton />
        </main>
        {detailsId && (
          <aside className={styles.sidebar} aria-label="details panel">
            <Outlet />
          </aside>
        )}
      </div>
      {selectedPokemons.length > 0 && <Flyout />}
    </>
  );
};

export default App;
