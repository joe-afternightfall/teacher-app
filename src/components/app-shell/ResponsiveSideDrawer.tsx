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
  const { window, handleDrawerToggle, open } = props;
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
  handleDrawerToggle: () => void;
  open: boolean;
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
