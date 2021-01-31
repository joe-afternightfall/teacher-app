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
    // necessary for content to be below app bar
    // toolbar: theme.mixins.toolbar,
    title: {
      flex: 1,
    },
    toolbar: {
      // width: DRAWER_SIZE,
      // color: theme.palette.primary.contrastText,
      // background: theme.palette.primary.main,
      // background: '#7450f5',
      // todo:  extract out blue color to theme
      background: '#0aa3f5',
      // color: '#6b8e9b', // text and icon colors
      // color: '#708c9b', // text and icon colors
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
        aria-labelledby={'nested-list-subheader'}
        subheader={
          <ListSubheader component={'div'} id={'nested-list-subheader'}>
            {'Nested List Items'}
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem
          button
          onClick={() => {
            props.clickHandler(routes.DASHBOARD);
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            props.clickHandler(routes.BOOKMARKS);
          }}
        >
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary={'Bookmarks List'} />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={'My Planner'} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => {
                props.clickHandler(routes.LESSON_PLANNER);
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={'Lesson Planner'} />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => {
                props.clickHandler(routes.TEMPLATE_BUILDER);
              }}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary={'Template Builder'} />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export interface NavigationProps {
  clickHandler: (route: string) => void;
}

const mapStateToProps = (state: any): NavigationProps => {
  return ({} as unknown) as NavigationProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NavigationProps =>
  (({
    clickHandler: (route: string) => {
      dispatch(routerActions.push(route));
    },
  } as unknown) as NavigationProps);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
