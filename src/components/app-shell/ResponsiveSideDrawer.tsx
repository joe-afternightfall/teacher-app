import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import NestedList from '../../NestedList';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

const ResponsiveSideDrawer = (
  props: ResponsiveSideDrawerProps
): JSX.Element => {
  const { window, handleDrawerToggle, mobileOpen } = props;
  const classes = useStyles();
  const theme = useTheme();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp>
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
          variant="permanent"
          open
        >
          {<NestedList />}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export interface ResponsiveSideDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const mapStateToProps = (
  state: any,
  ownProps: any
): ResponsiveSideDrawerProps => {
  return ({} as unknown) as ResponsiveSideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ResponsiveSideDrawerProps =>
  (({} as unknown) as ResponsiveSideDrawerProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveSideDrawer);
