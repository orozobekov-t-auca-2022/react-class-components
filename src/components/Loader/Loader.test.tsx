import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import Loader from ".";

describe('Loader Component', () => {
  it('renders loader component', () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  })
})