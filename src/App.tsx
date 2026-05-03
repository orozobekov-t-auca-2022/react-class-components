import { Component, type ChangeEvent, type ReactNode, type SubmitEvent } from 'react';
import styles from './App.module.css'
import CardList from './components/CardList';
import Search from './components/Search';
import Header from './components/Header';
import ErrorButton from './components/ErrorButton';
import ErrorList from './components/ErrorList';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';

interface IProps{
  name: string
}

interface IPokeResponse{
  count: number,
  results: {
    name: string,
    url: string
  }[]
}

interface IState{
  pokemons: IPokeResponse,
  isLoading: boolean,
  error: string | null,
  searchPrompt: string,
}

const ERROR_MESSAGE = 'It seems that something went wrong. We ask you to visit our site later';

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      pokemons: {
        count: 0,
        results: []
      },
      isLoading: true,
      error: null,
      searchPrompt: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(): Promise<void> {
    if(localStorage.getItem('searchQuery')) {
      this.setState({searchPrompt: localStorage.getItem('searchQuery') ?? ''})
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_POKE_API_KEY}`);
      if(!response.ok) {
        throw new Error('Network error');
      }
      const data = await response.json();
      this.setState({pokemons: data, isLoading: false})
    } catch (error) {
      if (error instanceof Error) {
        this.setState({error: error.message, isLoading: false});
      } else {
        console.error(`An unexpected error has occured ${error}`);
      }
    }
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.setState({searchPrompt: this.state.searchPrompt.trimStart().trimEnd()})
  }

  handleChange(e: ChangeEvent<HTMLInputElement, Element>) {
    e.preventDefault();
    this.setState({searchPrompt: e.target.value})
    localStorage.setItem('searchQuery', this.state.searchPrompt);
  }

  render(): ReactNode {
    const { pokemons, isLoading, error } = this.state;
    if (isLoading) {
      return <Loader />
    }
    const data = pokemons.results.filter((pokemon) => pokemon.name.toLowerCase().includes(this.state.searchPrompt.toLowerCase()))
    return (
    <ErrorBoundary>
      <main className={styles.container}>
        <Header />
        <Search value={this.state.searchPrompt} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        {
          error ? <ErrorList message={ERROR_MESSAGE} /> : <CardList results={data} />
        }
        <ErrorButton />
      </main>
    </ErrorBoundary>
    ) 
  }
}

export default App
