import { render, screen, fireEvent } from './test-utils/render';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import App from './App';
import { act } from 'react';

vi.mock('./components/CardList', () => ({
  default: ({ results }: { results: { name: string; url: string }[] }) => (
    <section data-testid="card-list-mock">
      <ul>
        {results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </section>
  ),
}));

const pokemons = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
];

const createResponse = (body: unknown, ok: boolean = true): Response =>
  ({
    ok,
    json: async () => body,
  }) as Response;

const loadPokemonList = async () => {
  await act(async () => {
    await Promise.resolve();
    await vi.advanceTimersByTimeAsync(3000);
    await Promise.resolve();
  });
};

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('shows loader on initial render and renders the fetched results', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse({
        count: pokemons.length,
        results: pokemons,
      })
    );

    render(<App />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    await loadPokemonList();

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('restores the saved search term from localStorage and filters the initial list', async () => {
    localStorage.setItem('searchQuery', 'charizard');

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse({
        count: pokemons.length,
        results: pokemons,
      })
    );

    render(<App />);

    expect(screen.getByRole('textbox')).toHaveValue('charizard');
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    await loadPokemonList();

    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  it('keeps the search input field empty when localStorage has no saved term', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse({
        count: pokemons.length,
        results: pokemons,
      })
    );

    render(<App />);
    expect(localStorage.getItem('searchQuery')).toBeNull();
    expect(screen.getByRole('textbox')).toHaveValue('');

    await loadPokemonList();

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('saves trimmed search term and filters the loaded results', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse({
        count: pokemons.length,
        results: pokemons,
      })
    );

    render(<App />);

    expect(fetchSpy).toHaveBeenCalledTimes(1);

    await loadPokemonList();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: ' bul   ' } });
    fireEvent.click(searchButton);

    expect(input).toHaveValue('bul');
    expect(localStorage.getItem('searchQuery')).toBe('bul');
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.queryByText('squirtle')).not.toBeInTheDocument();
    expect(screen.queryByText('charizard')).not.toBeInTheDocument();
  });

  it('overwrites an existing localStorage value after a new search', async () => {
    localStorage.setItem('searchQuery', 'char');

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse({
        count: pokemons.length,
        results: pokemons,
      })
    );

    render(<App />);

    await loadPokemonList();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   char  ' } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem('searchQuery')).toBe('char');
    expect(input).toHaveValue('char');
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.queryByText('squirtle')).not.toBeInTheDocument();
  });

  it('shows an error when the initial request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse({ message: 'Internal Server Error' }, false)
    );

    await act(async () => {
      render(<App />);
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(
      screen.getByText(/it seems that something went wrong/i)
    ).toBeInTheDocument();
  });

  it('renders the error boundary fallback when the error button throws', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse({
        count: pokemons.length,
        results: pokemons,
      })
    );

    render(<App />);

    await act(async () => {
      await Promise.resolve();
      await vi.advanceTimersByTime(3000);
    });

    fireEvent.click(screen.getByRole('button', { name: /error/i }));
    expect(screen.getByText(/oops, something went wrong/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
