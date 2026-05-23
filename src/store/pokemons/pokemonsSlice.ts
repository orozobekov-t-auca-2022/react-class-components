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
    },
    unselectAll: (state) => {
      state.selectedPokemons = []
    }
  }
});

export const {select, unselect, unselectAll} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
