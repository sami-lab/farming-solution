import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.

const darkGreen = '#088178';
const darkBlack = '#303538';
const light = '#fff';
const theme = createTheme({
  palette: {
    common: {
      primary: `${darkGreen}`,
      darkBlack: darkBlack,
      light: light,
    },
    primary: {
      main: darkBlack,
    },
    secondary: {
      main: `${light}`,
    },
    background: {
      default: light,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Averta',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.5,
      color: darkBlack,
    },
    h2: {
      fontFamily: 'Averta',
      fontSize: '1.4rem',
      color: '#504e4b',
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Averta',
      fontSize: '0.75rem',
      color: '#000',
      lineHeight: '12px',
      fontWeight: 300,
      fontStyle: 'normal',
      letterSpacing: '.25px',
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: 'Averta',
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Averta',
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontFamily: 'Averta',
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontFamily: 'Averta',
      fontSize: '1rem',
      fontWeight: 300,
      color: '#303538',
    },
    body1: {
      fontSize: '1.25rem',
      fontWeight: 300,
    },
    caption: {
      fontFamily: 'Averta',
      fontSize: '1em',
      fontWeight: 700,
      color: darkGreen,
    },
    label: {
      fontFamily: 'Averta',
      color: darkBlack,
      fontWeight: 700,
      fontSize: '14px',
    },
    input: {
      fontFamily: 'Averta',
      fontSize: '1rem',
      color: darkBlack,
      lineHeight: 1.4,
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #899298',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #3c74cc',
        boxShadow: '0 0 0 3px #dceefc',
      },
    },
    button: {
      backgroundColor: darkGreen,
      fontFamily: 'Averta',
      color: light,
      fontSize: '1.2rem',
      textTransform: 'none',
      '&:hover': {
        border: '1px solid #899298',
        backgroundColor: darkGreen,
      },
    },
  },
});

export default theme;
