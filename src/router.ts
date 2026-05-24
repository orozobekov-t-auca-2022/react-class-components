import { createBrowserRouter } from 'react-router';
import App from './App';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Details from './components/Details';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
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
