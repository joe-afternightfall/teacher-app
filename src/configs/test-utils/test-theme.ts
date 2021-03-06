import createMuiTheme, {
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';
import { Palette } from '@material-ui/core/styles/createPalette';

interface CustomPalette extends Palette {
  colors: {
    active: {
      highlight: string;
      hover: string;
      contrastColor: string;
    };
    offWhite: string;
    accents: {
      pink: string;
      orange: string;
      green: string;
      blue: string;
      purple: string;
    };
  };
}

export interface AppTheme extends Theme {
  palette: CustomPalette;
}

interface AppThemeOptions extends ThemeOptions {
  palette: CustomPalette;
}

export function getThemeWithSize(size: string): Theme {
  return createMuiTheme(({
    props: {
      MuiWithWidth: {
        initialWidth: size,
      },
    },
    palette: {
      colors: {
        // background: '#f3f4f2',
        offWhite: '#F5F5F5',
        // headerHighlight: '#502df1',
        active: {
          // highlight: '#5532f1',
          highlight: '#674bf2',
          hover: '#E8E5F4',
          contrastColor: '#6B8E9B',
          // contrastColor: '#708C9B', // text and icon colors
          // background: '#b5aaf5', // left border highlight
        },
        accents: {
          pink: '#E43F78',
          orange: '#EF8C0A',
          green: '#77C74B',
          blue: '#2C9DF0',
          purple: '#725FE7',
        },
      },
      text: {
        primary: '#686868',
        secondary: '#686868',
      },
      type: 'light',
      primary: {
        light: '#62bbfc',
        main: '#0AA3F5',
        dark: '#2976b0',
        contrastText: '#FFF',
      },
      secondary: {
        light: '#8B77F4',
        main: '#6F55F2',
        dark: '#4D3BA9',
        contrastText: '#FFF',
      },
    },
  } as unknown) as AppThemeOptions);
}
