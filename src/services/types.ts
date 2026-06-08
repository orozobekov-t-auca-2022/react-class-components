export interface IPokemonListItem {
  name: string;
  url: string;
}

export interface IPokemonListResponse {
  count: number;
  results: IPokemonListItem[];
}

export interface IPkemonAbility {
  ability: {
    name: string;
  };
}

export interface IPokemonForm {
  name: string;
}

export interface IPokemonDetailsResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  abilities: IPkemonAbility[];
  height: number;
  forms: IPokemonForm[];
}

export interface IPokemonSpeciesFlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface IPokemonSpeciesResponse {
  flavor_text_entries: IPokemonSpeciesFlavorTextEntry[];
}
