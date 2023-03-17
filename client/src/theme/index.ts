import createTheme, { ThemeOptions } from '@mui/material/styles/createTheme';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

/** Generated using the MUI Theme tools. */
export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#00622c',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
