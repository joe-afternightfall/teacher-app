import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Navigation from '../Navigation';
import Drawer from '@material-ui/core/Drawer';
import { useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { setDrawerSize } from '../../../../creators/application/side-drawer';

const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: (props: any) => props.size,
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
    props.updateSizeHandler('56px');
  } else if (isMedium) {
    props.updateSizeHandler('240px');
  }

  return (
    <Drawer
      open
      variant={'permanent'}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {<Navigation />}
    </Drawer>
  );
};

export interface PermSideDrawerProps {
  drawerSize: string;
  updateSizeHandler: (size: string) => void;
}

const mapStateToProps = (state: any): PermSideDrawerProps => {
  return ({
    drawerSize: state.applicationState.drawerSize,
  } as unknown) as PermSideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PermSideDrawerProps =>
  (({
    updateSizeHandler: (size: string) => {
      dispatch(setDrawerSize(size));
    },
  } as unknown) as PermSideDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(PermSideDrawer);
