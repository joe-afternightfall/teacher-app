import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';

export function getLightTheme(): Theme {
  return createMuiTheme({
    palette: {
      text: {
        primary: '#686868',
        secondary: '#686868',
        // color: '#6B8E9B', // text and icon colors
        // color: '#708C9B', // text and icon colors
      },
      type: 'light',
      primary: {
        light: '#62bbfc',
        main: '#0AA3F5',
        dark: '#2976b0',
        contrastText: '#6B8E9B',
      },
      secondary: {
        light: '#817AD5',
        main: '#6F55F2',
        dark: '#1B2674',

        // color: '#7450f5',
        // color: '#6F55F2',
        // color: '#887AF5',
        // color: '#674BF2',
        // color: '#8B78F5',
        contrastText: '#FFF',
      },
    },
  });
}
