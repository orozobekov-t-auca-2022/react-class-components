import { Component, type ReactNode, type SubmitEvent } from 'react';
import './App.css'
import CardList from './components/CardList';
import Search from './components/Search';

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
  error: string | null
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
      error: null
    }
  }

  async componentDidMount(): Promise<void> {
    try {
      const response = await fetch(`${import.meta.env.VITE_POKE_API_KEY}`);
      if(!response.ok) {
        throw new Error('Network error');
      }
      const data = await response.json();
      this.setState({pokemons: data, isLoading: false})
      console.log(this.state);
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
  }

  render(): ReactNode {
    const { pokemons, isLoading, error } = this.state;
    if (error) {
      return <p>Error has occured</p>
    }
    if (isLoading) {
      return <p>Loading</p>
    }
    return (
    <>
      <Search onSubmit={this.handleSubmit} />
      <CardList results={pokemons.results} />
    </>
    ) 
  }
}

export default App
