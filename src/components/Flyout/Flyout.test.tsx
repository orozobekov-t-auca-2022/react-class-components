import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from './Flyout';
import { useDispatch, useSelector } from 'react-redux';
import { unselectAll } from '../../store/pokemons/pokemonsSlice';
import { vi, type Mock } from 'vitest';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

const mockDispatch = vi.fn();

beforeEach(() => {
  (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
});

describe('Flyout component', () => {
  it('renders selected amount', () => {
  (useSelector as unknown as Mock).mockImplementation((cb) =>
    cb({
      pokemons: {
        selectedPokemons: [
          { id: 1, name: 'pikachu', url: 'url1' },
          { id: 2, name: 'bulbasaur', url: 'url2' },
        ],
      },
    })
  );

  render(<Flyout />);

  expect(
    screen.getByText(/selected items: 2/i)
  ).toBeInTheDocument();
  });

  it('dispatches unselectAll on click', () => {
  (useSelector as unknown as Mock).mockReturnValue({
    pokemons: {
      selectedPokemons: [],
    },
  });

  render(<Flyout />);

  fireEvent.click(
    screen.getByRole('button', {
      name: /unselect all/i,
    })
  );

  expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });

  it('calls createPokemonCsv with selected items on download click', () => {
    const selected = [
      { id: 1, name: 'pikachu', url: 'url1' },
      { id: 2, name: 'bulbasaur', url: 'url2' },
    ];

    (useSelector as unknown as Mock).mockImplementation((cb) =>
      cb({
        pokemons: {
          selectedPokemons: selected,
        },
      })
    );

    const createObjectUrlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const originalCreateElement = document.createElement.bind(document);
    const clickMock = vi.fn();
    const appendSpy = vi.spyOn(document.body, 'appendChild');
    const removeSpy = vi.spyOn(document.body, 'removeChild');

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const el = originalCreateElement(tagName) as HTMLAnchorElement;
      if (tagName === 'a') {
        el.click = clickMock;
      }
      return el;
    });

    render(<Flyout />);

    fireEvent.click(screen.getByRole('button', { name: /download/i }));

    expect(createObjectUrlSpy).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(revokeSpy).toHaveBeenCalled();

    createObjectUrlSpy.mockRestore();
    revokeSpy.mockRestore();
    (document.createElement as unknown as Mock).mockRestore();
    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });
})