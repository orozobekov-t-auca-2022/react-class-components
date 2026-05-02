import { Component, type ReactNode, type SubmitEvent } from 'react';
import styles from './App.module.css'
import CardList from './components/CardList';
import Search from './components/Search';
import Header from './components/Header';

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
  searchPrompt: string
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      pokemons: {
        count: 0,
        results: []
      },
      isLoading: false,
      error: null,
      searchPrompt: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render(): ReactNode {
    const { pokemons, isLoading, error } = this.state;
    if (error) {
      return <p>Error has occured</p>
    }
    if (isLoading) {
      return <p>Loading</p>
    }
    const data = pokemons.results.filter((pokemon) => pokemon.name.toLowerCase().includes(this.state.searchPrompt.toLowerCase()))
    return (
    <main className={styles.container}>
      <Header />
      <Search value={this.state.searchPrompt} onChange={(e) => {
        this.setState({searchPrompt: e.target.value})
        localStorage.setItem('searchQuery', this.state.searchPrompt);
        }} onSubmit={this.handleSubmit} />
      <CardList results={data} />
    </main>
    ) 
  }
}

export default App
