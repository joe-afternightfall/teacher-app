import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import * as React from 'react';

interface DeleteDialogProps {
  commitDeletedAppointment: () => void;
  toggleConfirmationVisible: () => void;
  open: boolean;
}

export default function DeleteDialog(props: DeleteDialogProps) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>{'Delete'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'Are you sure you want to delete?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.toggleConfirmationVisible}
          color={'primary'}
          variant={'outlined'}
        >
          {'Cancel'}
        </Button>
        <Button
          onClick={props.commitDeletedAppointment}
          color={'secondary'}
          variant={'outlined'}
        >
          {'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
