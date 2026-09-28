import { Outlet } from 'react-router-dom';

import { Layout } from '@/entities/layout';

export const BaseLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);
