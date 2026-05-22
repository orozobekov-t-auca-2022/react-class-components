import { createSlice } from "@reduxjs/toolkit";
import type { IState } from "./types";

const initialState: IState = {
  selectedPokemons: []
};

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    select: (state, payload) => {
      state.selectedPokemons = [
        ...state.selectedPokemons,
        payload.payload
      ]
    },
    unselect: (state, payload) => {
      state.selectedPokemons = state.selectedPokemons.filter((pokemon) => pokemon !== payload.payload)
    }
  }
});

export const {select, unselect} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;