import React from 'react';
import {
  List,
  AppBar,
  Toolbar,
  ListItem,
  Collapse,
  Typography,
  ListItemText,
  ListItemIcon,
  ListSubheader,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../configs/redux/store';
import { routerActions } from 'connected-react-router';
import { NavListItem } from './navigation/NavListItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { RouteProp, routes } from '../../../configs/constants/routes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AssignmentRounded as AssignmentIcon } from '@material-ui/icons';
import { closeSideDrawer } from '../../../creators/application/side-drawer';
import icon from '../../../configs/icons/fox-runner.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    title: {
      flex: 1,
    },
    toolbar: {
      // color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
    },
    iconButton: {
      color: theme.palette.primary.contrastText,
    },
    icon: {
      position: 'absolute',
      left: 8,
      height: '32px',
    },
  })
);

const Navigation = (props: NavigationProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeAndRoute = (route: string) => {
    props.clickHandler(route);

    if (props.isDrawerOpen) {
      setTimeout(() => {
        props.closeSideDrawerHandler();
      }, 300);
    }
  };

  return (
    <div>
      <AppBar position={'relative'}>
        <Toolbar className={classes.toolbar}>
          {/*<Typography variant={'h6'} className={classes.title}>*/}
          {/*  {'Drawer Title'}*/}
          {/*</Typography>*/}

          <img className={classes.icon} src={icon} />

          {/*<IconButton*/}
          {/*  className={classes.iconButton}*/}
          {/*  onClick={props.toggleSideDrawerHandler}*/}
          {/*  data-testid={'chevron-left-toggle-button'}*/}
          {/*>*/}
          {/*  <ChevronLeftIcon data-testid={'chevron-left'} />*/}
          {/*</IconButton>*/}
        </Toolbar>
      </AppBar>

      {/*<Divider />*/}

      <List
        component={'nav'}
        className={classes.root}
        aria-labelledby={'nested-list-subheader'}
        // subheader={
        //   <ListSubheader component={'div'} id={'nested-list-subheader'}>
        //     {'Nested List Items'}
        //   </ListSubheader>
        // }
      >
        <NavListItem
          pageInfo={routes.DASHBOARD}
          activePath={props.activePage.path}
          clickHandler={() => {
            closeAndRoute(routes.DASHBOARD.path);
          }}
        />

        <NavListItem
          pageInfo={routes.BOOKMARKS}
          activePath={props.activePage.path}
          clickHandler={() => {
            closeAndRoute(routes.BOOKMARKS.path);
          }}
        />

        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={'My Planner'} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout={'auto'} unmountOnExit>
          <List component={'div'} disablePadding>
            <NavListItem
              nested={false}
              activePath={props.activePage.path}
              pageInfo={routes.LESSON_PLANNER}
              clickHandler={() => {
                closeAndRoute(routes.LESSON_PLANNER.path);
              }}
            />

            <NavListItem
              //  todo:  delete "nested" prop
              nested={false}
              activePath={props.activePage.path}
              pageInfo={routes.TEMPLATE_BUILDER}
              clickHandler={() => {
                closeAndRoute(routes.TEMPLATE_BUILDER.path);
              }}
            />
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export interface NavigationProps {
  activePage: RouteProp;
  isDrawerOpen: boolean;
  closeSideDrawerHandler: () => void;
  clickHandler: (route: string) => void;
}

const mapStateToProps = (state: State): NavigationProps => {
  return ({
    activePage: state.applicationState.activePage,
    isDrawerOpen: state.applicationState.sideDrawerIsOpen,
  } as unknown) as NavigationProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NavigationProps =>
  (({
    clickHandler: (route: string) => {
      dispatch(routerActions.push(route));
    },
    closeSideDrawerHandler: (): void => {
      dispatch(closeSideDrawer());
    },
  } as unknown) as NavigationProps);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
