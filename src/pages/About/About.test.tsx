import { render, screen } from '@testing-library/react';
import About from '.';

describe('About page', () => {
  it('renders about page content', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', {
        name: /information about the author/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/author: tilek/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/discord:/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/telegram:/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/linkedin:/i)
    ).toBeInTheDocument();
  });

  it('renders react course link', () => {
    render(<About />);

    const link = screen.getByRole('link', {
      name: /link to react course/i,
    });

    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});