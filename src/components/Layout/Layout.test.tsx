import { render, screen } from '../../test-utils/render';
import Layout from './Layout';

describe('Layout', () => {
  it('renders Header and Outlet container', () => {
    render(<Layout />);

    expect(screen.getByRole('heading', { name: /pokemon wiki/i })).toBeInTheDocument();
  });
});
