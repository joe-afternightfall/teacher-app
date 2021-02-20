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
import ResponsiveSideDrawer from './components/app-shell/side-drawer/ResponsiveSideDrawer';
import SubjectBuilderDialog from './components/widgets/subject-builder/SubjectBuilderDialog';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  root: {
    display: 'flex',
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={getLightTheme()}>
        <div className={classes.root}>
          <CssBaseline />
          <AppDialog />
          <AppSnackbar />
          <SubjectBuilderDialog />

          <AppBar />
          <ResponsiveSideDrawer />

          <main className={classes.content}>
            <div className={classes.toolbar} />

            <div>{this.props.children}</div>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export interface AppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
}

export default withStyles(styles, { withTheme: true })(App);
