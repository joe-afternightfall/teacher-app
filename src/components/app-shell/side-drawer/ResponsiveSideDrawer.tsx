import React from 'react';
import { Dispatch } from 'redux';
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { State } from '../../../configs/redux/store';
import Navigation from './../side-drawer/Navigation';
import { closeSideDrawer } from '../../../creators/application/side-drawer';

const drawerSize = (props: any) => props.size;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerSize,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerSize,
    },
  })
);

const ResponsiveSideDrawer = (
  props: ResponsiveSideDrawerProps
): JSX.Element => {
  const { window, open } = props;
  const classes = useStyles({
    size: props.drawerSize,
  });
  const theme = useTheme();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp>
        <Drawer
          container={container}
          variant={'temporary'}
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
          onClose={props.closeSideDrawerHandler}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {<Navigation />}
        </Drawer>
      </Hidden>

      <Hidden smDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant={'permanent'}
          open
        >
          {<Navigation />}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export interface ResponsiveSideDrawerProps {
  open: boolean;
  drawerSize: string;
  window?: () => Window;
  closeSideDrawerHandler: () => void;
}

const mapStateToProps = (state: State): ResponsiveSideDrawerProps => {
  return ({
    open: state.applicationState.sideDrawerIsOpen,
    drawerSize: state.applicationState.drawerSize,
  } as unknown) as ResponsiveSideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ResponsiveSideDrawerProps =>
  (({
    closeSideDrawerHandler: (): void => {
      dispatch(closeSideDrawer());
    },
  } as unknown) as ResponsiveSideDrawerProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveSideDrawer);
