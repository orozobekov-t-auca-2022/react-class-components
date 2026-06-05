import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router.ts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts';
import { ThemeProvider } from './theme/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={setupStore()}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
