import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { hideAppSnackbar } from '../../creators/app-snackbar';
import { State } from '../../configs/redux/store';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const AppSnackbar = (props: AppSnackbarProps): JSX.Element => {
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    props.handleClose();
  };

  return (
    <Snackbar
      onClose={handleClose}
      autoHideDuration={3000}
      open={props.shouldDisplay}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="success">
        {props.snackbarText}
      </Alert>
    </Snackbar>
  );
};

export interface AppSnackbarProps {
  shouldDisplay: boolean;
  snackbarText: string;
  handleClose: () => void;
}

const mapStateToProps = (state: State): AppSnackbarProps => {
  return ({
    shouldDisplay: state.applicationState.displayAppSnackbar,
    snackbarText: state.applicationState.snackbarText,
  } as unknown) as AppSnackbarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppSnackbarProps =>
  (({
    handleClose: () => {
      dispatch(hideAppSnackbar());
    },
  } as unknown) as AppSnackbarProps);

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackbar);
