import MainLayout from '../layout/MainLayout';
import DashboardView from '../views/Dashboard';
import VoucherView from '../views/Voucher';

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/', element: <DashboardView /> },
    { path: '/new-voucher', element: <VoucherView /> },
  ],
};

export default MainRoutes;
