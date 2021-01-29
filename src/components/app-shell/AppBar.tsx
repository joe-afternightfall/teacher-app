import clsx from 'clsx';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../configs/redux/store';
import { toggleSideDrawer } from '../../creators/application/side-drawer';

export const DRAWER_SIZE = '45vw';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      color: '#fff',
      zIndex: theme.zIndex.drawer + 1,
      // color: theme.palette.text.primary,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: DRAWER_SIZE,
      width: `calc(100% - ${DRAWER_SIZE})`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    logoWrapper: {
      flexGrow: 1,
    },
  })
);

function TopAppBar(props: AppBarProps): JSX.Element {
  const classes = useStyles();

  const open = props.open;

  return (
    <AppBar
      position={'fixed'}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          edge={'start'}
          color={'inherit'}
          onClick={props.toggleSideDrawerHandler}
          data-testid={'toggle-app-drawer-button'}
          aria-label={'open drawer'}
          className={clsx({
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        {/*<div className={classes.logoWrapper}>*/}
        {/*  */}
        {/*</div>*/}
      </Toolbar>
    </AppBar>
  );
}

export interface AppBarProps {
  open: boolean;
  toggleSideDrawerHandler: () => void;
}

const mapStateToProps = (state: State): AppBarProps => {
  return ({
    open: state.applicationState.openSideDrawer,
  } as unknown) as AppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppBarProps =>
  (({
    toggleSideDrawerHandler: (): void => {
      dispatch(toggleSideDrawer());
    },
  } as unknown) as AppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
