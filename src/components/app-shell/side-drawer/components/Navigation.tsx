import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from '@material-ui/core';
import { NavListItem } from './NavListItem';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import { RouteProp, routes } from '../../../../configs/constants/routes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MIN_DRAWER_WIDTH } from '../../../../configs/constants/drawer-size';
import { closeSideDrawer } from '../../../../creators/application/side-drawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Navigation = (props: NavigationProps): JSX.Element => {
  const classes = useStyles();

  const closeAndRoute = (route: string) => {
    props.clickHandler(route);

    if (props.isDrawerOpen) {
      setTimeout(() => {
        props.closeSideDrawerHandler();
      }, 300);
    }
  };

  const shouldDisplayText =
    props.drawerSize !== MIN_DRAWER_WIDTH || props.tempDrawer;

  return (
    <List
      component={'nav'}
      className={classes.root}
      aria-labelledby={'nested-list-subheader'}
    >
      {Object.keys(routes).map((value: string, index: number) => {
        return (
          <NavListItem
            key={index}
            displayText={shouldDisplayText}
            activePath={props.activePage.path}
            pageInfo={routes[value]}
            clickHandler={() => {
              closeAndRoute(routes[value].path);
            }}
          />
        );
      })}
    </List>
  );
};

export interface NavigationProps {
  activePage: RouteProp;
  isDrawerOpen: boolean;
  closeSideDrawerHandler: () => void;
  clickHandler: (route: string) => void;
  drawerSize: string;
  tempDrawer: boolean;
}

const mapStateToProps = (state: State): NavigationProps => {
  return ({
    activePage: state.applicationState.activePage,
    isDrawerOpen: state.applicationState.sideDrawerIsOpen,
    drawerSize: state.applicationState.drawerSize,
  } as unknown) as NavigationProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): NavigationProps =>
  (({
    clickHandler: (route: string) => {
      dispatch(routerActions.push(route));
    },
    closeSideDrawerHandler: (): void => {
      dispatch(closeSideDrawer());
    },
  } as unknown) as NavigationProps);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
