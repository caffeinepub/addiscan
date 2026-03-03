import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { Layout } from './components/Layout';
import { ScanPage } from './pages/ScanPage';
import { EncyclopediaPage } from './pages/EncyclopediaPage';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// Child routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ScanPage,
});

const encyclopediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/encyclopedia',
  component: EncyclopediaPage,
});

const routeTree = rootRoute.addChildren([indexRoute, encyclopediaRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
