import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { useMediaQuery } from '@material-ui/core';
import Navigation from '../components/Navigation';
import {
  MIN_DRAWER_WIDTH,
  FULL_DRAWER_WIDTH,
} from '../../../../configs/constants/drawer-size';
import {
  setDrawerSize,
  userClickedOpenDrawer,
  userClickedCloseDrawer,
} from '../../../../creators/application/side-drawer';
import { State } from '../../../../configs/redux/store';
import SideDrawerAppBar from '../components/SideDrawerAppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: (props: { size: string }) => props.size,
    },
  })
);

const PermSideDrawer = (props: PermSideDrawerProps): JSX.Element => {
  const classes = useStyles({
    size: props.drawerSize,
  });

  const isSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between('sm', 'sm')
  );
  const isMedium = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between('md', 'xl')
  );

  if (isSmall) {
    props.updateSizeHandler(MIN_DRAWER_WIDTH);
  } else if (isMedium && !props.userClickedCloseDrawer) {
    props.updateSizeHandler(FULL_DRAWER_WIDTH);
  }

  const closeDrawerClickHandler = () => {
    props.userClickedCloseHandler();
    props.updateSizeHandler(MIN_DRAWER_WIDTH);
  };

  return (
    <Drawer
      open
      variant={'permanent'}
      classes={{
        paper: classes.drawerPaper,
      }}
      data-testid={'perm-side-drawer'}
    >
      <SideDrawerAppBar
        drawerSize={props.drawerSize}
        closeHandler={closeDrawerClickHandler}
        logoClickHandler={props.logoClickHandler}
      />
      <Navigation tempDrawer={false} />
    </Drawer>
  );
};

export interface PermSideDrawerProps {
  userClickedCloseDrawer: boolean;
  drawerSize: string;
  updateSizeHandler: (size: string) => void;
  userClickedCloseHandler: () => void;
  logoClickHandler: () => void;
}

const mapStateToProps = (state: State): PermSideDrawerProps => {
  return ({
    drawerSize: state.applicationState.drawerSize,
    userClickedCloseDrawer: state.applicationState.userClickedCloseDrawer,
  } as unknown) as PermSideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PermSideDrawerProps =>
  (({
    updateSizeHandler: (size: string) => {
      dispatch(setDrawerSize(size));
    },
    userClickedCloseHandler: () => {
      dispatch(userClickedCloseDrawer());
    },
    logoClickHandler: () => {
      dispatch(userClickedOpenDrawer());
    },
  } as unknown) as PermSideDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(PermSideDrawer);
