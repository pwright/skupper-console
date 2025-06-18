import { lazy } from 'react';

import { DashboardRoutesPaths } from '../pages/Dashboard/Dashboard.enum';

const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard/views/Dashboard'));

export const dashboardRoutes = [
  {
    path: DashboardRoutesPaths.Dashboard,
    element: <Dashboard />
  }
];
