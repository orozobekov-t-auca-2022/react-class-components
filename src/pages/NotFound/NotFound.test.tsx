import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import NotFound from './NotFound';

describe('NotFound page', () => {
  it('navigates to home page after click', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-path']}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole('link', {
        name: /back to the list/i,
      })
    );

    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
