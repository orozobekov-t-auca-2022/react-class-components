import { render, screen } from '@testing-library/react';
import { vi, beforeEach, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from './App';

globalThis.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({
    count: 1,
    results: [{name: 'pikachu', url: 'someurl'}],
  })
});

beforeEach(() => {
  localStorage.clear();
})

describe('App', () => {
  it('shows loader on initial render', async () => {
    render(<App />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('renders cards after loading', async () => {
    render(<App />);
    expect(await screen.findByText('pikachu')).toBeInTheDocument();
  })
});

globalThis.fetch = vi.fn().mockResolvedValue({
  ok: false,
})

describe('', () => {
  it('shows error message when fetch fails', async () => {
    render(<App />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  })
})

describe('', () => {
  it('updates search input', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'pikachu');

    expect(input).toHaveValue('pikachu');
  });

  it('filters pokemons on submit', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await userEvent.type(input, 'pikachu');
    await userEvent.click(button);

    expect(screen.getByRole('pikachu')).toBeInTheDocument();
  });

  it('saves search to localStorage', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await userEvent.type(input, 'pikachu');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('pikachu')
  })
})