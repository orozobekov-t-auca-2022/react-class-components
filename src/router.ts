import { createBrowserRouter } from 'react-router';
import App from './App';
import About from './pages/About';
import Error from './pages/Error';
import Details from './components/Details';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App
  },
  {
    path: '/:page',
    Component: App,
    children: [
      {
        path: ':detailsId',
        Component: Details
      }
    ]
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
