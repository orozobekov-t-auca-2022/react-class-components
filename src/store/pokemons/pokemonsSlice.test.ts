import reducer, { select, unselect, unselectAll } from './pokemonsSlice';

describe('pokemonsSlice reducer', () => {
  const initialState = { selectedPokemons: [] };

  it('should handle select', () => {
    const pokemon = { id: 1, name: 'pikachu', url: 'url1' };
    const next = reducer(initialState, select(pokemon));
    expect(next.selectedPokemons).toHaveLength(1);
    expect(next.selectedPokemons[0]).toEqual(pokemon);
  });

  it('should handle unselect', () => {
    const state = { selectedPokemons: [{ id: 1, name: 'pikachu', url: 'url1' }] };
    const next = reducer(state, unselect(1));
    expect(next.selectedPokemons).toHaveLength(0);
  });

  it('should handle unselectAll', () => {
    const state = { selectedPokemons: [{ id: 1, name: 'pikachu', url: 'url1' }] };
    const next = reducer(state, unselectAll());
    expect(next.selectedPokemons).toHaveLength(0);
  });
});
