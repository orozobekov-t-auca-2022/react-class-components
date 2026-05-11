import { render, screen, waitFor } from '../../test-utils/render';
import { describe, it, vi } from 'vitest';
import Card from '.';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

describe('Card Component', () => {
  const pokemon = {
    name: 'charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
  };

  const pokemonImageUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png';
  const pokemonSpeciesUrl =
    'https://pokeapi.co/api/v2/pokemon-species/charmander';

  it('displays the fetched image and description for a pokemon', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    server.use(
      http.get(pokemon.url, () =>
        HttpResponse.json({
          sprites: { front_default: pokemonImageUrl },
          id: pokemon.name,
        })
      ),
      http.get(pokemonSpeciesUrl, () =>
        HttpResponse.json({
          flavor_text_entries: [
            {
              flavor_text:
                'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
              language: { name: 'en' },
            },
          ],
        })
      )
    );

    render(<Card {...pokemon} />);

    expect(
      screen.getByRole('heading', { name: /charmander/i })
    ).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /charmander/i });

    await waitFor(() => expect(image).toHaveAttribute('src', pokemonImageUrl));
    expect(
      screen.getByText(
        /Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail./i
      )
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('keeps rendering the card when the API request fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    server.use(
      http.get(pokemon.url, () => HttpResponse.json({}, { status: 500 })),
      http.get(pokemonSpeciesUrl, () => HttpResponse.json({}, { status: 500 }))
    );

    render(<Card {...pokemon} />);

    expect(
      screen.getByRole('heading', { name: /charmander/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /charmander/i })
    ).toBeInTheDocument();

    await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalled());

    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
