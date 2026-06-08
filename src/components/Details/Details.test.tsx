import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router';
import Details from './Details';
import { it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../theme';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { setupStore } from '../../store/store';

const renderDetails = (ui: React.ReactElement) => {
  const store = setupStore();

  return render(
    <ThemeProvider>
      <Provider store={store}>
        <ErrorBoundary>{ui}</ErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
};

describe('Details component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders pokemon details after loading', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/25', () =>
        HttpResponse.json({
          name: 'pikachu',
          sprites: {
            front_default: 'pikachu.png',
          },
          abilities: [
            {
              ability: {
                name: 'static',
              },
            },
          ],
          id: 25,
          height: 4,
          forms: [
            {
              name: 'pikachu',
            },
          ],
        })
      ),
      http.get('https://pokeapi.co/api/v2/pokemon-species/25', () =>
        HttpResponse.json({
          flavor_text_entries: [
            {
              language: {
                name: 'en',
              },
              flavor_text: 'Electric mouse pokemon',
            },
          ],
        })
      )
    );

    renderDetails(
      <MemoryRouter initialEntries={['/?page=1&details=25']}>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await act(async () => {
      await Promise.resolve();
      await vi.advanceTimersByTimeAsync(3000);
      await Promise.resolve();
    });

    expect(
      screen.getByRole('heading', {
        name: /pikachu/i,
        level: 2,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/electric mouse pokemon/i)).toBeInTheDocument();

    expect(screen.getByText(/static/i)).toBeInTheDocument();

    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();

    expect(
      screen.getByRole('img', {
        name: /pikachu/i,
      })
    ).toHaveAttribute('src', 'pikachu.png');
  }, 10000);

  it('shows an error message when pokemon details request fails', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/25', () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
      ),
      http.get('https://pokeapi.co/api/v2/pokemon-species/25', () =>
        HttpResponse.json({
          flavor_text_entries: [
            {
              language: {
                name: 'en',
              },
              flavor_text: 'Electric mouse pokemon',
            },
          ],
        })
      )
    );

    renderDetails(
      <MemoryRouter initialEntries={['/?page=1&details=25']}>
        <Details />
      </MemoryRouter>
    );

    await act(async () => {
      await Promise.resolve();
      await vi.advanceTimersByTimeAsync(3000);
      await Promise.resolve();
    });

    expect(
      screen.getByText(/failed to load pokemon details/i)
    ).toBeInTheDocument();
  }, 10000);

  it('closes details panel after click', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/25', () =>
        HttpResponse.json({
          name: 'pikachu',
          sprites: {
            front_default: 'pikachu.png',
          },
          abilities: [
            {
              ability: {
                name: 'static',
              },
            },
          ],
          id: 25,
          height: 4,
          forms: [
            {
              name: 'pikachu',
            },
          ],
        })
      ),
      http.get('https://pokeapi.co/api/v2/pokemon-species/25', () =>
        HttpResponse.json({
          flavor_text_entries: [
            {
              language: {
                name: 'en',
              },
              flavor_text: 'Electric mouse pokemon',
            },
          ],
        })
      )
    );

    renderDetails(
      <MemoryRouter initialEntries={['/?page=1&details=25']}>
        <Details />
      </MemoryRouter>
    );

    await act(async () => {
      await Promise.resolve();
      await vi.advanceTimersByTimeAsync(3000);
      await Promise.resolve();
    });

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(window.location.search).not.toContain('details');
  }, 10000);
});
