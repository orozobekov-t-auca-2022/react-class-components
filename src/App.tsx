import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import styles from './App.module.css';
import CardList from './components/CardList/CardList';
import Search from './components/Search';
import ErrorButton from './components/ErrorButton/ErrorButton';
import ErrorList from './components/ErrorList/ErrorList';
import Loader from './components/Loader/Loader';
import type { IState } from './type';
import { getPageCount, getPagesArray } from './utils/pages';
import Pagination from './components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router';
import useLocalStorage from './hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import Flyout from './components/Flyout/Flyout';
import { useGetPokemonListQuery } from './services/pokemon';
import RefreshButton from './components/RefreshButton/RefreshButton';

const ERROR_MESSAGE =
  'It seems that something went wrong. We ask you to visit our site later';

const PAGE_LIMIT = 20;

const getPokemonIdFromUrl = (url: string) => {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? Number(match[1]) : -1;
};

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedPrompt, , savePrompt] = useLocalStorage('searchQuery', '');
  const [searchPrompt, setSearchPrompt] = useState(savedPrompt);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(searchPrompt.trim())
  const detailsId = searchParams.get('details');
  const page = Number(searchParams.get('page')) || 1;
  const currentPage = page ? page : 1;
  const offset = (currentPage - 1) * PAGE_LIMIT;

  const {data: pokemonPage, isLoading, error} = useGetPokemonListQuery({offset, limit: PAGE_LIMIT});

  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemons.selectedPokemons
  );

  const allPokemons = pokemonPage?.results.map((pokemon) => ({
    ...pokemon,
    id: getPokemonIdFromUrl(pokemon.url),
  })) ?? [];
  
  const filteredPokemons = appliedSearchTerm
  ? allPokemons.filter((pokemon) => 
    pokemon.name.toLowerCase().includes(appliedSearchTerm.toLowerCase())
  )
  : allPokemons;

  const totalCount = appliedSearchTerm ? filteredPokemons.length : pokemonPage?.count ?? 0;

  const pokemons: IState['pokemons'] = {
    count: totalCount,
    results: filteredPokemons,
  };

  const pagesArray = getPagesArray(getPageCount(totalCount, PAGE_LIMIT));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPrompt(e.target.value);
    setSearchParams({ page: '1' });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const trimmedSearch = searchPrompt.trim();
    setSearchPrompt(trimmedSearch);
    savePrompt(trimmedSearch);
    setAppliedSearchTerm(trimmedSearch);
    setSearchParams({page: '1'});
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
                  currentPage={currentPage}
                  onChange={(actualPage: number) => {
                    setSearchParams({ page: `${actualPage}` });
                  }}
                />
              )}
            </>
          )}
          <div className={styles.actionButtons}>
            <ErrorButton />
            <RefreshButton />
          </div>
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
