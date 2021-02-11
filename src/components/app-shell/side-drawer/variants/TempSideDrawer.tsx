import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Navigation from '../components/Navigation';
import { State } from '../../../../configs/redux/store';
import SideDrawerAppBar from '../components/SideDrawerAppBar';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { closeSideDrawer } from '../../../../creators/application/side-drawer';

const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: 240,
    },
  })
);

const TempSideDrawer = (props: TempSideDrawerProps): JSX.Element => {
  const { window, open } = props;
  const classes = useStyles();
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
      data-testid={'temp-side-drawer'}
    >
      <SideDrawerAppBar />

      <Navigation tempDrawer={true} />
    </Drawer>
  );
};

export interface TempSideDrawerProps {
  open: boolean;
  window?: () => Window;
  closeSideDrawerHandler: () => void;
}

const mapStateToProps = (state: State): TempSideDrawerProps => {
  return ({
    open: state.applicationState.sideDrawerIsOpen,
  } as unknown) as TempSideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TempSideDrawerProps =>
  (({
    closeSideDrawerHandler: (): void => {
      dispatch(closeSideDrawer());
    },
  } as unknown) as TempSideDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(TempSideDrawer);
