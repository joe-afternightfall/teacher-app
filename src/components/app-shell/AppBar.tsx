import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { State } from '../../configs/redux/store';
import IconButton from '@material-ui/core/IconButton';
import icon from '../../configs/icons/rainbow-shades.svg';
import { RouteProp } from '../../configs/constants/routes';
import { AppTheme } from '../../configs/theme/light-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { openSideDrawer } from '../../creators/application/side-drawer';

const drawerSize = (props: { size: string }) => props.size;

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    appBar: {
      background: '#fff',
      [theme.breakpoints.up('sm')]: {
        width: drawerSize,
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
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    icon: {
      height: '40px',
    },
  })
);

function TopAppBar(props: AppBarProps): JSX.Element {
  const width = `calc(100% - ${props.drawerSize})`;
  const classes = useStyles({
    size: width,
  });

  return (
    <AppBar position={'fixed'} className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems={'center'} justify={'space-between'}>
          <Grid item>
            <IconButton
              edge={'start'}
              color={'inherit'}
              className={classes.menuButton}
              data-testid={'toggle-app-drawer-button'}
              onClick={props.openSideDrawerHandler}
            >
              <MenuIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <img className={classes.icon} src={icon} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export interface AppBarProps {
  drawerSize: string;
  activePage: RouteProp;
  openSideDrawerHandler: () => void;
}

const mapStateToProps = (state: State): AppBarProps => {
  return ({
    activePage: state.applicationState.activePage,
    drawerSize: state.applicationState.drawerSize,
  } as unknown) as AppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppBarProps =>
  (({
    openSideDrawerHandler: (): void => {
      dispatch(openSideDrawer());
    },
  } as unknown) as AppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
