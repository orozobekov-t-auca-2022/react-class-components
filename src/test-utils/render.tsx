import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';

function render(ui: ReactElement, options?: RenderOptions) {
  const user = userEvent.setup();

  return {
    user,
    ...rtlRender(<MemoryRouter>{ui}</MemoryRouter>, options),
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { render };
