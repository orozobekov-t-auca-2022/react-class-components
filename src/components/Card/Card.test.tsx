import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Card from ".";

describe('Card Component', () => {
  it('displays correct name information', () => {
    const pokemon = {
      id: 'charmander',
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    };

    render(<Card {...pokemon} />);

    expect(screen.getByText('charmander')).toBeInTheDocument();
  });
});
