import { describe } from "vitest";
import { render, screen } from "../../test-utils/render";
import Header from ".";

describe('Header Component', () => {
  it('renders the application title', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: /pokemon wiki/i })).toBeInTheDocument();
  });
});