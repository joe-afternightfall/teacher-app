import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import routes from '../../../configs/constants/routes';
import { routerActions } from 'connected-react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import {
  Divider,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  ListSubheader,
  Toolbar,
  Typography,
  AppBar,
} from '@material-ui/core';
import {
  Bookmark as BookmarkIcon,
  DashboardRounded as DashboardIcon,
  AssignmentRounded as AssignmentIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import { toggleSideDrawer } from '../../../creators/application/side-drawer';
import { NavListItem } from './navigation/NavListItem';

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
          title={'Dashboard'}
          icon={<DashboardIcon />}
          clickHandler={() => {
            closeAndRoute(routes.DASHBOARD);
          }}
        />

        <NavListItem
          title={'Bookmarks List'}
          icon={<BookmarkIcon />}
          clickHandler={() => {
            closeAndRoute(routes.BOOKMARKS);
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
              title={'Lesson Planner'}
              icon={<StarBorder />}
              clickHandler={() => {
                closeAndRoute(routes.LESSON_PLANNER);
              }}
              nested={true}
            />

            <NavListItem
              title={'Template Builder'}
              icon={<EditIcon />}
              clickHandler={() => {
                closeAndRoute(routes.TEMPLATE_BUILDER);
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
}

const mapStateToProps = (state: any): NavigationProps => {
  return ({} as unknown) as NavigationProps;
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
