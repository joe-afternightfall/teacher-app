import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function TopAppBar() {
  const classes = useStyles();

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <IconButton
          edge={'start'}
          className={classes.menuButton}
          color={'inherit'}
          aria-label={'menu'}
        >
          <MenuIcon />
        </IconButton>
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
