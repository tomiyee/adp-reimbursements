import {
  AppBar,
  Box,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import sidebarAtom from '../recoil/sidebar';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const setSidebarState = useSetRecoilState(sidebarAtom);

  useEffect(() => {
    setSidebarState((old) => ({
      ...old,
      drawerOpen: !matchDownMd,
    }));
  }, [setSidebarState, matchDownMd]);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      {/* To position content. See https://github.com/mui/material-ui/issues/16844#issuecomment-517205129 */}
      <Toolbar />

      <Sidebar />

      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;

const Main = styled('main')({});
