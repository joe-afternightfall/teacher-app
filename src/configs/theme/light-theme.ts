import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';

export function getLightTheme(): Theme {
  return createMuiTheme({
    palette: {
      text: {
        primary: '#686868',
        secondary: '#686868',
      },
      type: 'light',
      primary: {
        light: '#62bbfc',
        main: '#3baafc',
        dark: '#2976b0',
        contrastText: '#fff',
      },
      secondary: {
        light: '#817AD5',
        main: '#504EA3',
        dark: '#1B2674',
        contrastText: '#FFF',
      },
    },
  });
}
