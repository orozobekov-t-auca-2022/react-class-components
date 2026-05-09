import { render, screen, waitFor } from '@testing-library/react';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  })

  it('shows loader on initial render', async () => {
    render(<App />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('makes initial API call on component mount', async() => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    })

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
  });

  it('handle search term from localStorage on initial load', async () => {
    localStorage.setItem('searchQuery', 'charizard');

    render(<App />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('charizard');
  })
});

globalThis.fetch = vi.fn().mockResolvedValue({
  ok: false,
})

describe('error handling', () => {
  it('shows error message when fetch fails', async () => {
    render(<App />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('handles network errors', async () => {
    render(<App />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  })
})

describe('user interactions', () => {
  it('updates search input when user types', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'pikachu');

    expect(input).toHaveValue('pikachu');
  });

  it('searches for the pokemon on submit', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {name: /search/i});

    await userEvent.type(input, 'bulbasaur');
    await userEvent.click(button);

    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
  });

  it('saves search to localStorage on submit', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {name: /search/i});

    await userEvent.type(input, 'pikachu');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('pikachu')
  })
})