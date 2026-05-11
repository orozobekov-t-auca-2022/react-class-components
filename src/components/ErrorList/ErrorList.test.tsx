import { render, screen } from '../../test-utils/render';
import { describe, it } from 'vitest';
import ErrorList from '.';

describe('ErrorList Component', () => {
  it('renders the provided message', () => {
    render(<ErrorList message="Something went wrong" />);

    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeInTheDocument();
  });
});
