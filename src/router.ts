import { createBrowserRouter } from 'react-router';
import { createElement } from 'react';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Details from './components/Details/Details';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import Main from './pages/Main/Main';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: createElement(ErrorFallback),
    children: [
      {
        path: '',
        Component: Main,
        children: [
          {
            index: true,
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