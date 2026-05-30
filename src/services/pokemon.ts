import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IPokemonDetailsResponse, type IPokemonListResponse, type IPokemonSpeciesFlavorTextEntry, type IPokemonSpeciesResponse } from "./types";

export const getEnglishFlavorText = (
  flavorTextEntries: IPokemonSpeciesFlavorTextEntry[]
) => {
  return (
    flavorTextEntries.find((entry) => entry.language.name === 'en')
      ?.flavor_text ?? ''
  );
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
  tagTypes: ['Pokemon', 'PokemonSpecies'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<IPokemonListResponse, { offset: number, limit: number}>({
      query: ({offset, limit}) => `pokemon?offset=${offset}&limit=${limit}`,
      providesTags: (result) => 
        result ? [
          {type: 'Pokemon' as const, id: 'LIST'},
          ...result.results.map((pokemon) => ({
            type: 'Pokemon' as const, id: pokemon.url
          })),
        ] :
        [{type: 'Pokemon' as const, id: 'LIST'}],
    }),
    getPokemonByUrl: builder.query<IPokemonDetailsResponse, string>({
      query: (pokemonUrl) => pokemonUrl,
      providesTags: (_result, _error, pokemonUrl) => [
        { type: 'Pokemon' as const, id: pokemonUrl },
      ],
    }),
    getPokemonSpeciesByName: builder.query<IPokemonSpeciesResponse, string>({
      query: (pokemonName) => `pokemon-species/${pokemonName}`,
      providesTags: (_result, _error, pokemonName) => [
        { type: 'PokemonSpecies' as const, id: pokemonName },
      ],
    }),
    getPokemonById: builder.query<IPokemonDetailsResponse, number>({
      query: (pokemonId) => `pokemon/${pokemonId}`,
      providesTags: (_result, _error, pokemonId) => [
        { type: 'Pokemon' as const, id: pokemonId },
      ],
    }),
  })
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByUrlQuery,
  useGetPokemonSpeciesByNameQuery,
  useGetPokemonByIdQuery
} = pokemonApi