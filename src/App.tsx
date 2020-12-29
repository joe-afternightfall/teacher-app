import React, { Component } from 'react';
import {
  StyledComponentProps,
  Theme,
  ThemeProvider as MuiThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getLightTheme } from './configs/theme/light-theme';
// import AppBar from './components/app-shell/app-bar/AppBarConnector';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
});

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={getLightTheme()}>
        <div className={classes.root}>
          <CssBaseline />
          {/*<AppBar />*/}

          {'TEACHER-APP'}
        </div>
      </MuiThemeProvider>
    );
  }
}

export interface AppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
  username: string | null;
  checkAuthentication: Function | null;
  hideAppShell: boolean;
  thereAreAuditReports: boolean;
}

export default withStyles(styles, { withTheme: true })(App);