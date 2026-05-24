import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import ErrorBoundary from '../components/ErrorBoundary';
import { ThemeProvider } from '../theme';

function render(ui: ReactElement, options?: RenderOptions) {
  const user = userEvent.setup();

  const store = setupStore();

  return {
    user,
    ...rtlRender(
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <MemoryRouter>{ui}</MemoryRouter>
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>,
      options
    ),
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { render };
