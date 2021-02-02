import React from 'react';
import { Dispatch } from 'redux';
import {
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Navigation from '../Navigation';
import Drawer from '@material-ui/core/Drawer';
import { State } from '../../../../configs/redux/store';
import { closeSideDrawer } from '../../../../creators/application/side-drawer';

const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: (props: any) => props.size,
    },
  })
);

const TempSideDrawer = (props: TempSideDrawerProps): JSX.Element => {
  const { window, open } = props;
  const classes = useStyles({
    size: props.drawerSize,
  });
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
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
  );
};

export interface TempSideDrawerProps {
  open: boolean;
  drawerSize: string;
  window?: () => Window;
  closeSideDrawerHandler: () => void;
}

const mapStateToProps = (state: State): TempSideDrawerProps => {
  return ({
    open: state.applicationState.sideDrawerIsOpen,
    drawerSize: state.applicationState.drawerSize,
  } as unknown) as TempSideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TempSideDrawerProps =>
  (({
    closeSideDrawerHandler: (): void => {
      dispatch(closeSideDrawer());
    },
  } as unknown) as TempSideDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(TempSideDrawer);
