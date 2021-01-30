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
import { DRAWER_SIZE } from '../../configs/constants/drawer-size';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      color: '#fff',
      background: theme.palette.primary.main,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${DRAWER_SIZE})`,
        marginLeft: DRAWER_SIZE,
      },
      zIndex: theme.zIndex.drawer + 1,
      // color: theme.palette.text.primary,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar: {
      // color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
    },
  })
);

function TopAppBar(props: AppBarProps): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position={'fixed'} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          // edge={'start'}
          color={'inherit'}
          className={classes.menuButton}
          data-testid={'toggle-app-drawer-button'}
          onClick={props.tempToggleSideDrawerHandler}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {'NEW Responsive drawer'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export interface AppBarProps {
  // tempOpen: boolean;
  tempToggleSideDrawerHandler: () => void;
}

const mapStateToProps = (state: State): AppBarProps => {
  return ({
    open: state.applicationState.sideDrawerIsOpen,
  } as unknown) as AppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any): AppBarProps =>
  (({
    toggleSideDrawerHandler: (): void => {
      dispatch(toggleSideDrawer());
    },
  } as unknown) as AppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
