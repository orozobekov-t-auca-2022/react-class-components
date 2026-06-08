import { render, screen, fireEvent } from '../../test-utils/render';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import { act } from 'react';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import Main from './Main';

vi.mock('./components/CardList/CardList', () => ({
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

const loadPokemonList = async () => {
  await act(async () => {
    await Promise.resolve();
    await vi.advanceTimersByTimeAsync(3000);
    await Promise.resolve();
  });
};

const mockPokemonList = (count = pokemons.length, results = pokemons) => {
  server.use(
    http.get('https://pokeapi.co/api/v2/pokemon', () =>
      HttpResponse.json({ count, results })
    )
  );
};

const mockPokemonListError = () => {
  server.use(
    http.get('https://pokeapi.co/api/v2/pokemon', () =>
      HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    )
  );
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
    mockPokemonList();

    render(<Main />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await loadPokemonList();

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('restores the saved search term from localStorage and filters the initial list', async () => {
    localStorage.setItem('searchQuery', 'charizard');

    mockPokemonList();

    render(<Main />);

    expect(screen.getByRole('textbox')).toHaveValue('charizard');

    await loadPokemonList();

    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  it('keeps the search input field empty when localStorage has no saved term', async () => {
    mockPokemonList();

    render(<Main />);
    expect(localStorage.getItem('searchQuery')).toBeNull();
    expect(screen.getByRole('textbox')).toHaveValue('');

    await loadPokemonList();

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('hides pagination when a search returns no results', async () => {
    mockPokemonList(1360);

    render(<Main />);

    await loadPokemonList();

    expect(screen.getByRole('button', { name: '68' })).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'asd' } });
    fireEvent.click(searchButton);

    expect(
      screen.queryByRole('button', { name: '68' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('navigation', { name: /pagination/i })
    ).not.toBeInTheDocument();
  });

  it('saves trimmed search term and filters the loaded results', async () => {
    mockPokemonList();

    render(<Main />);

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

    mockPokemonList();

    render(<Main />);

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
    mockPokemonListError();

    render(<Main />);

    await loadPokemonList();

    expect(
      screen.getByText(/it seems that something went wrong/i)
    ).toBeInTheDocument();
  });

  it('renders the error boundary fallback when the error button throws', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    mockPokemonList();

    render(<Main />);

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
