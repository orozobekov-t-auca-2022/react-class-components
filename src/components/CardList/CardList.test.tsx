import { render, screen } from '../../test-utils/render';
import { describe, expect, it, vi } from 'vitest';
import CardList from '.';
import type { IPokeResponse } from '../../type';

vi.mock('../Card', () => ({
  default: ({ name }: { name: string }) => <h2>{name}</h2>,
}));

describe('CardList Component', () => {
  it('renders each card when data is provided', () => {
    const items: IPokeResponse = {
      count: 3,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', id: 1 },
        { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/', id: 6 },
        { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/', id: 9 },
      ]
    };

    render(<CardList {...items} />);

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getByText('blastoise')).toBeInTheDocument();
  });

  it('displays appropriate message when the results array is empty', () => {
    const items: IPokeResponse = {
      count: 0,
      results: []
    };
    render(<CardList {...items} />);

    expect(screen.getByText(/no matching Pokemon found/i)).toBeInTheDocument();
  });
});
