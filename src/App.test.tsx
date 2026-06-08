import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import App from './App';

const TestPage = () => <div data-testid="page">Hello Page</div>;

test('renders layout and outlet content', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<App />}>
          <Route index element={<TestPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByTestId('page')).toBeInTheDocument();
});