import clsx from 'clsx';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import AppBar from './components/app-shell/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppDialog from './components/app-shell/AppDialog';
import { getLightTheme } from './configs/theme/light-theme';
import AppSnackbar from './components/app-shell/AppSnackbar';
import SideDrawer from './components/app-shell/SideDrawer';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  root: {
    display: 'flex',
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // contentShift: {
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // },
});

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={getLightTheme()}>
        <div className={classes.root}>
          <AppDialog />
          <AppSnackbar />
          <CssBaseline />

          <AppBar />
          <SideDrawer />

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: null,
            })}
          >
            <div className={classes.drawerHeader} />

            <div>{this.props.children}</div>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export interface AppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
  open: boolean;
}

export default withStyles(styles, { withTheme: true })(App);
