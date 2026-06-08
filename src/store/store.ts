import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemon';
import pokemonsReducer from './pokemons/pokemonsSlice';
import formsReducer from './forms/formsSlice';

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  forms: formsReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
