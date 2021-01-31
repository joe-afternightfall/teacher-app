import React from 'react';
import {
  List,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  Collapse,
  Typography,
  ListItemText,
  ListItemIcon,
  ListSubheader,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'connected-react-router';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { RouteProp, routes } from '../../../configs/constants/routes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../configs/redux/store';
import { NavListItem } from './navigation/NavListItem';
import { AssignmentRounded as AssignmentIcon } from '@material-ui/icons';
import { toggleSideDrawer } from '../../../creators/application/side-drawer';

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
    setTimeout(() => {
      props.toggleSideDrawerHandler();
    }, 300);
  };

  return (
    <div>
      <AppBar position={'static'}>
        <Toolbar className={classes.toolbar}>
          <Typography variant={'h6'} className={classes.title}>
            {'Drawer Title'}
          </Typography>

          {/*<IconButton*/}
          {/*  className={classes.iconButton}*/}
          {/*  onClick={props.toggleSideDrawerHandler}*/}
          {/*  data-testid={'chevron-left-toggle-button'}*/}
          {/*>*/}
          {/*  <ChevronLeftIcon data-testid={'chevron-left'} />*/}
          {/*</IconButton>*/}
        </Toolbar>
      </AppBar>

      <Divider />

      <List
        component={'nav'}
        className={classes.root}
        aria-labelledby={'nested-list-subheader'}
        subheader={
          <ListSubheader component={'div'} id={'nested-list-subheader'}>
            {'Nested List Items'}
          </ListSubheader>
        }
      >
        <NavListItem
          title={routes.DASHBOARD.drawerTitle}
          icon={React.createElement(routes.DASHBOARD.icon)}
          clickHandler={() => {
            closeAndRoute(routes.DASHBOARD.path);
          }}
        />

        <NavListItem
          title={routes.BOOKMARKS.drawerTitle}
          icon={React.createElement(routes.BOOKMARKS.icon)}
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
              title={routes.LESSON_PLANNER.drawerTitle}
              icon={React.createElement(routes.LESSON_PLANNER.icon)}
              clickHandler={() => {
                closeAndRoute(routes.LESSON_PLANNER.path);
              }}
              nested={true}
            />

            <NavListItem
              title={routes.TEMPLATE_BUILDER.drawerTitle}
              icon={React.createElement(routes.TEMPLATE_BUILDER.icon)}
              clickHandler={() => {
                closeAndRoute(routes.TEMPLATE_BUILDER.path);
              }}
              nested={true}
            />
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export interface NavigationProps {
  clickHandler: (route: string) => void;
  toggleSideDrawerHandler: () => void;
  pageInfo: RouteProp;
}

const mapStateToProps = (state: State): NavigationProps => {
  return ({
    pageInfo: state.applicationState.pageInfo,
  } as unknown) as NavigationProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NavigationProps =>
  (({
    clickHandler: (route: string) => {
      dispatch(routerActions.push(route));
    },
    toggleSideDrawerHandler: (): void => {
      dispatch(toggleSideDrawer());
    },
  } as unknown) as NavigationProps);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
