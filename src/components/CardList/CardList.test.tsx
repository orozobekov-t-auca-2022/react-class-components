import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CardList from ".";

describe('CardList Component', () => {
  it('renders correct number of cards when data is provided', () => {
    const items = [
      {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
      {name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/'},
      {name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/'}
    ]

    render(<CardList results={items} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getByText('blastoise')).toBeInTheDocument();
  });

  it('displays appropriate message when the results array is empty', () => {
    render(<CardList results={[]} />);

    expect(screen.getByText('No matching Pokemon found')).toBeInTheDocument();
  });
})