import { createTheme } from '@mui/material';

import color from './color';
import {blue, grey, lightBlue} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[200],
      contrastText: '#000000',
    },
    secondary: {
      main: grey[500],
    },
  },

  typography: {
    fontFamily: 'krPubDotumLight',
    h1: {
      fontSize: '16px',
      fontFamily: 'GmarketSansBold',
    },
    h2: {
      fontSize: '16px',
      fontWeight: 'GmarketSansMedium',
    },
    h3: {
      fontSize: '16px',
      fontFamily: 'koPubDotumBold',
    },
    h4: {
      fontSize: '12px',
      fontFamily: 'koPubDotumLight',
    },
    subtitle1: {
      fontSize: '12px',
      fontFamily: 'GmarketSansMedium',
    },
    body1: {
      fontSize: '12px',
      fontFamily: 'koPubDotumMedium',
    },
    body2: {
      fontFamily: 'koPubDotumMedium',
      fontSize: '14px',
    },
    button: {
      fontFamily: 'GmarketSansMedium',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#ffffff',
          color: '#000000',
          fontSize: '14px',
          padding: '10px 15px',
          borderRadius: '4px',
          fontFamily: 'GmarketSansMedium',
        },
        arrow: {
          '&::before': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
  },
});

export default theme;
