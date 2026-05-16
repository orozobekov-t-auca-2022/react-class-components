export interface IPokeResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface IState {
  pokemons: IPokeResponse;
  isLoading: boolean;
  error: string | null;
  searchPrompt: string;
  page: number;
  limit: number;
}
