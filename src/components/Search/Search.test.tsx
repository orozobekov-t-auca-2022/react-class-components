import { render, screen } from "../../test-utils/render";
import { describe, vi } from "vitest";
import Search from ".";
import { Component } from "react";

interface IHarnessState {
  value: string;
};

class SearchHarness extends Component<Record<string, never>, IHarnessState> {
  state: IHarnessState = {
    value: '',
  };

  render() {
    return (
      <Search
        value={this.state.value}
        onSubmit={(event) => event.preventDefault()}
        onChange={(event) => this.setState({ value: event.target.value })}
      />
    );
  }
}

describe('Search Component', () => {
  it('renders search input and button', () => {
    render(<Search onSubmit={vi.fn()} onChange={vi.fn()} value="bulbasaur" />);

    expect(screen.getByRole('textbox')).toHaveValue('bulbasaur');
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls change handler when user types', async () => {
    const handleChange = vi.fn();
    const { user } = render(
      <Search onSubmit={vi.fn()} onChange={handleChange} value="" />
    );

    await user.type(screen.getByRole('textbox'), 'pikachu');

    expect(handleChange).toHaveBeenCalledTimes(7);
  });

  it('submits the form when search button is clicked', async () => {
    const handleSubmit = vi.fn((event) => event.preventDefault());
    const { user } = render(
      <Search onSubmit={handleSubmit} onChange={vi.fn()} value="pikachu" />
    );

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('stays synchronized with a controlled class parent', async () => {
    const { user } = render(<SearchHarness />);

    await user.type(screen.getByRole('textbox'), 'pikachu');

    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });
});