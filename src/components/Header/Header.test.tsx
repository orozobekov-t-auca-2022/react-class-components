import { describe, it, beforeEach, vi } from 'vitest';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './Header';

let toggleMock = vi.fn();

vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: toggleMock }),
}));

const renderWithRouter = (route = '/') =>
  rtlRender(
    <MemoryRouter initialEntries={[route]}>
      <Header />
    </MemoryRouter>
  );

describe('Header Component', () => {
  beforeEach(() => {
    toggleMock = vi.fn();
  });

  it('renders the application title', () => {
    renderWithRouter('/');

    expect(
      screen.getByRole('heading', { name: /pokemon wiki/i })
    ).toBeInTheDocument();
  });

  it('shows About as link and Home as text on root route', () => {
    renderWithRouter('/');

    expect(screen.queryByRole('link', { name: /home/i })).toBeNull();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('shows Home as link and About as text on /about route', () => {
    renderWithRouter('/about');

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /about/i })).toBeNull();
  });

  it('calls toggleTheme when theme button clicked', () => {
    renderWithRouter('/');

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(toggleMock).toHaveBeenCalled();
  });
});
