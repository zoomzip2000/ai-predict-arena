import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from './Layout/Layout';
import { HomePage, TasksPage, ErrorPage } from './pages';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: '/tasks',
        element: <TasksPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
