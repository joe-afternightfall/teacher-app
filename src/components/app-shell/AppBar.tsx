import React from 'react';
import SideDrawer from './SideDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function TopAppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position={'static'} className={classes.root}>
      <Toolbar>
        <SideDrawer />
        <Typography
          variant={'h6'}
          className={classes.title}
          data-testid={'app-bar-title'}
        >
          {"Jamie's Teacher App"}
        </Typography>
        <AccountCircle />
      </Toolbar>
    </AppBar>
  );
}
