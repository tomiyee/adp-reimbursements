import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

const Routes: React.FC = () => {
  return useRoutes([MainRoutes]);
};

export default Routes;
