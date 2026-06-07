import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IState } from './types';
import type { IPokemon } from '../../type';

const initialState: IState = {
  selectedPokemons: [],
};

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    select: (state, payload: PayloadAction<IPokemon>) => {
      state.selectedPokemons = [...state.selectedPokemons, payload.payload];
    },
    unselect: (state, payload: PayloadAction<number>) => {
      state.selectedPokemons = state.selectedPokemons.filter(
        (pokemon) => pokemon.id !== payload.payload
      );
    },
    unselectAll: (state) => {
      state.selectedPokemons = [];
    },
  },
});

export const { select, unselect, unselectAll } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;