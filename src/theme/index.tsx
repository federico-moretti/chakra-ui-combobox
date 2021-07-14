import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    blue: {
      50: '#e5ecff',
      100: '#b7c7fd',
      200: '#8aa1f6',
      300: '#5c7bf0',
      400: '#2e56ea', // main
      500: '#153cd1',
      600: '#0d2fa3',
      700: '#072276',
      800: '#02144a',
      900: '#00071e',
    },
    greyBlue: {
      50: '#edf0fe',
      100: '#cdd2e6',
      200: '#aeb5d1',
      300: '#8d97be',
      400: '#6d79aa',
      500: '#546091',
      600: '#414a71',
      700: '#2e3551', // main
      800: '#1b2033',
      900: '#050b17',
    },
    pink: {
      50: '#ffe5ed',
      100: '#fbb9c8',
      200: '#f28ca3',
      300: '#ec607f', // main
      400: '#e5355a',
      500: '#cb1c41',
      600: '#9f1332',
      700: '#730c24',
      800: '#460415',
      900: '#1e0006',
    },
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: '15px',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: '10px',
        fontSize: '13px',
      },
      sizes: {
        md: {
          fontSize: '13px',
          padding: '9px 20px',
        },
      },
      defaultProps: {
        colorScheme: 'blue',
      },
    },
  },
});

export default theme;
