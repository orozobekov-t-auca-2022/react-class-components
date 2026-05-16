import { createBrowserRouter } from 'react-router';
import App from './App';
import About from './pages/About';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    // loader
  },
  {
    path: '/about',
    Component: About,
  },
  {
    path: '/*',
    Component: Error,
  },
]);

export default router;
