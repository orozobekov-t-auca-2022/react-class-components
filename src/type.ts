export interface IPokeResponse {
  count: number;
  results: IPokemon[];
}

export interface IState {
  pokemons: IPokeResponse;
  isLoading: boolean;
  error: string | null;
}

export interface IPokemon{
  name: string;
  url: string;
  id: number
}