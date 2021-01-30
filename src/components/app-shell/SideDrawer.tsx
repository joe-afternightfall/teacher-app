import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { toggleSideDrawer } from '../../creators/application/side-drawer';
import { DRAWER_SIZE } from '../../configs/constants/drawer-size';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_SIZE,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: DRAWER_SIZE,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: 0,
      },
    },

    // Todo:  below is for app bar
    title: {
      flex: 1,
    },
    toolbar: {
      width: DRAWER_SIZE,
      // color: theme.palette.primary.contrastText,
      background: theme.palette.secondary.main,
    },
    iconButton: {
      color: theme.palette.primary.contrastText,
    },
  })
);

const SideDrawer = (props: SideDrawerProps): JSX.Element => {
  const classes = useStyles();

  const open = props.open;

  return (
    <Drawer
      variant={'permanent'}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <AppBar position={'static'}>
        <Toolbar className={classes.toolbar}>
          <Typography variant={'h6'} className={classes.title}>
            {'Drawer Title'}
          </Typography>

          <IconButton
            className={classes.iconButton}
            onClick={props.toggleSideDrawerHandler}
            data-testid={'chevron-left-toggle-button'}
          >
            <ChevronLeftIcon data-testid={'chevron-left'} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Drawer>
  );
};

export interface SideDrawerProps {
  open: boolean;
  toggleSideDrawerHandler: () => void;
}

const mapStateToProps = (state: any): SideDrawerProps => {
  return ({
    open: state.applicationState.sideDrawerIsOpen,
  } as unknown) as SideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SideDrawerProps =>
  (({
    toggleSideDrawerHandler: (): void => {
      dispatch(toggleSideDrawer());
    },
  } as unknown) as SideDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
