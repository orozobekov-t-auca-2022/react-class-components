import {
  Component,
  type ChangeEvent,
  type ReactNode,
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

class App extends Component<{}, IState> {
  private allPokemons: { name: string; url: string }[] = [];

  constructor(props: {}) {
    super(props);
    this.state = {
      pokemons: {
        count: 0,
        results: [],
      },
      isLoading: true,
      error: null,
      searchPrompt: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterPokemons = this.filterPokemons.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const savedSearch = localStorage.getItem('searchQuery');
    if (savedSearch) {
      this.setState({ searchPrompt: savedSearch });
    }

    this.setState({ isLoading: true });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_POKE_API_KEY}?limit=1000&offset=0`
      );
      if (!response.ok) {
        throw new Error('Network error');
      }
      const data = await response.json();

      setTimeout(() => {
        this.allPokemons = data.results;

        const filteredResults = savedSearch
          ? data.results.filter((pokemon: { name: string }) =>
              pokemon.name.toLowerCase().includes(savedSearch.toLowerCase())
            )
          : data.results;

        this.setState({
          pokemons: {
            results: filteredResults,
            count: data.count,
          },
          isLoading: false,
        });
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message, isLoading: false });
      } else {
        console.log(`An unexpected error has occured ${error}`);
        this.setState({
          error: 'An unexpected error occured',
          isLoading: false,
        });
      }
    }
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const trimmedSearch = this.state.searchPrompt.trim();
    this.setState({ searchPrompt: trimmedSearch });
    localStorage.setItem('searchQuery', trimmedSearch);
    this.filterPokemons(trimmedSearch);
  }

  filterPokemons(searchTerm: string) {
    const filtered = this.allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({
      pokemons: {
        results: filtered,
        count: filtered.length,
      },
    });
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchPrompt: e.target.value });
  }

  render(): ReactNode {
    const { pokemons, isLoading, error } = this.state;

    return (
      <ErrorBoundary>
        <main className={styles.container}>
          <Header />
          <Search
            value={this.state.searchPrompt}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorList message={ERROR_MESSAGE} />
          ) : (
            <CardList results={pokemons.results} />
          )}
          <ErrorButton />
        </main>
      </ErrorBoundary>
    );
  }
}

export default App;
