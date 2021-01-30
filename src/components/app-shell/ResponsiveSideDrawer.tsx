import React from 'react';
import { Dispatch } from 'redux';
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import NestedList from '../../NestedList';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { DRAWER_SIZE } from '../../configs/constants/drawer-size';
import { toggleSideDrawer } from '../../creators/application/side-drawer';
import { State } from '../../configs/redux/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: DRAWER_SIZE,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: DRAWER_SIZE,
    },
  })
);

const ResponsiveSideDrawer = (
  props: ResponsiveSideDrawerProps
): JSX.Element => {
  const { window, open } = props;
  const classes = useStyles();
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
          onClose={props.toggleSideDrawerHandler}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {<NestedList />}
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
          {<NestedList />}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export interface ResponsiveSideDrawerProps {
  window?: () => Window;
  toggleSideDrawerHandler: () => void;
  open: boolean;
}

const mapStateToProps = (state: State): ResponsiveSideDrawerProps => {
  return ({
    open: state.applicationState.sideDrawerIsOpen,
  } as unknown) as ResponsiveSideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ResponsiveSideDrawerProps =>
  (({
    toggleSideDrawerHandler: (): void => {
      dispatch(toggleSideDrawer());
    },
  } as unknown) as ResponsiveSideDrawerProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveSideDrawer);
