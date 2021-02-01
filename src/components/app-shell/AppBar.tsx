import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { State } from '../../configs/redux/store';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { RouteProp } from '../../configs/constants/routes';
import { DRAWER_SIZE } from '../../configs/constants/drawer-size';
import { toggleSideDrawer } from '../../creators/application/side-drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppTheme } from '../../configs/theme/light-theme';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    appBar: {
      background: '#fff',
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${DRAWER_SIZE})`,
        marginLeft: DRAWER_SIZE,
      },
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      color: theme.palette.text.primary,
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    title: {
      color: theme.palette.colors.active.highlight,
    },
  })
);

function TopAppBar(props: AppBarProps): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position={'fixed'} className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge={'start'}
          color={'inherit'}
          className={classes.menuButton}
          data-testid={'toggle-app-drawer-button'}
          onClick={props.toggleSideDrawerHandler}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          // todo:  extract out purple colors to theme
          style={{
            color: '#674bf2',
          }}
          noWrap
          variant={'h6'}
          data-testid={'app-bar-title'}
          className={classes.title}
        >
          {props.activePage.headerTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export interface AppBarProps {
  toggleSideDrawerHandler: () => void;
  activePage: RouteProp;
}

const mapStateToProps = (state: State): AppBarProps => {
  return ({
    activePage: state.applicationState.activePage,
  } as unknown) as AppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any): AppBarProps =>
  (({
    toggleSideDrawerHandler: (): void => {
      dispatch(toggleSideDrawer());
    },
  } as unknown) as AppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
