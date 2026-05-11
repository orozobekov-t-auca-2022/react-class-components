/* eslint-disable react-refresh/only-export-components */
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';

function render(ui: ReactElement, options?: RenderOptions) {
  return {
    userEvent,
    ...rtlRender(ui, options),
  };
}

export * from '@testing-library/react';
export { render };