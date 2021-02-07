import React from 'react';
import {
  List,
  ListItem,
  Collapse,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavListItem } from './NavListItem';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { AssignmentRounded as AssignmentIcon } from '@material-ui/icons';
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
    iconButton: {
      color: theme.palette.primary.contrastText,
    },
  })
);

const Navigation = (props: NavigationProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    closeAndRoute(routes.MY_PLANNER.path);
  };

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
      <NavListItem
        displayText={shouldDisplayText}
        pageInfo={routes.DASHBOARD}
        activePath={props.activePage.path}
        clickHandler={() => {
          closeAndRoute(routes.DASHBOARD.path);
        }}
      />

      <NavListItem
        displayText={shouldDisplayText}
        pageInfo={routes.BOOKMARKS}
        activePath={props.activePage.path}
        clickHandler={() => {
          closeAndRoute(routes.BOOKMARKS.path);
        }}
      />

      <NavListItem
        displayText={shouldDisplayText}
        activePath={props.activePage.path}
        pageInfo={routes.LESSON_PLANNER}
        clickHandler={() => {
          closeAndRoute(routes.LESSON_PLANNER.path);
        }}
      />

      <NavListItem
        displayText={shouldDisplayText}
        activePath={props.activePage.path}
        pageInfo={routes.TEMPLATE_BUILDER}
        clickHandler={() => {
          closeAndRoute(routes.TEMPLATE_BUILDER.path);
        }}
      />
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
