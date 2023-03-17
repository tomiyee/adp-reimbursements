import MainLayout from '../layout/MainLayout';
import DashboardView from '../views/Dashboard';
import NewVoucherView from '../views/Voucher';

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/', element: <DashboardView /> },
    { path: '/new-voucher', element: <NewVoucherView /> },
  ],
};

export default MainRoutes;
