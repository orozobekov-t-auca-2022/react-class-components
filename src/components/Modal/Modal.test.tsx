import { vi } from "vitest";
import { render, screen } from "../../test-utils/render";
import Modal from "./Modal";

describe("Modal component", () => {
  it('does not render when open is false', () => {
  render(
    <Modal open={false} onClose={vi.fn()}>
      <div>Content</div>
    </Modal>
  );

  expect(screen.queryByText('Content')).not.toBeInTheDocument();
});
})