import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router';
import Details from './Details';
import { it, vi, type Mock } from 'vitest';

describe('Details component', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
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
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          flavor_text_entries: [
            {
              language: {
                name: 'en',
              },
              flavor_text: 'Electric mouse pokemon',
            },
          ],
        }),
      }) as Mock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders pokemon details after loading', async () => {
    render(
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

  it('closes details panel after click', async () => {
    render(
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
