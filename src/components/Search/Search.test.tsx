import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import Search from ".";
import userEvent from "@testing-library/user-event";

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and button', () => {
    render(<Search onSubmit={vi.fn()} onChange={vi.fn()} value="bulbasaur" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /search/i})).toBeInTheDocument();
  });

  it('displays saved search term from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'bulbasaur');

    render(<Search onSubmit={vi.fn()} onChange={vi.fn()} value="bulbasaur" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('bulbasaur');
  });

  it('shows empty input when no save term exists', () => {
    render(<Search onSubmit={vi.fn()} onChange={vi.fn()} value="" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('updates input value when user types', async () =>{
    const handleChange = vi.fn();
    render(<Search onSubmit={vi.fn()} onChange={handleChange} value="" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'pikachu');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(7);
  });

  it('removes whitespace from search input', async () => {
    const handleSubmit = vi.fn();
    const handleChange = vi.fn();

    render(<Search onSubmit={handleSubmit} onChange={handleChange} value="   pikachu  " />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('overwrites existing search term in localStorage when new search term is passed', async () => {
    localStorage.setItem('searchQuery', 'bulbasaur');

    const handleSubmit = vi.fn((e) => {
      e.preventDefault();
      const trimmedValue = 'pikachu'.trim();
      localStorage.setItem('searchQuery', trimmedValue);
    });
    const handleChange = vi.fn();

    render(<Search onSubmit={handleSubmit} onChange={handleChange} value="pikachu" />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('pikachu');
  })
})