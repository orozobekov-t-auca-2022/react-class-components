import { createBrowserRouter } from 'react-router';
import { createElement } from 'react';
import App from './App';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Details from './components/Details/Details';
import Layout from './components/Layout/Layout';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: createElement(ErrorFallback),
    children: [
      {
        path: '',
        Component: App,
        children: [
          {
            path: '',
            Component: Details,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);

export default router;
