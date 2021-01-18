import React from 'react';
import {
  Grid,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export const DeleteSubjectDialog = (
  props: DeleteSubjectDialogProps
): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton edge={'end'} aria-label={'delete'} onClick={openDialog}>
        <DeleteIcon />
      </IconButton>

      <Dialog
        fullWidth={true}
        open={open}
        onClose={closeDialog}
        maxWidth={'sm'}
      >
        <DialogTitle id={'subject-list-dialog-title'}>
          <IconButton
            aria-label={'close'}
            className={classes.closeButton}
            onClick={closeDialog}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid
            container
            spacing={2}
            justify={'center'}
            direction={'column'}
            style={{
              minHeight: '50vh',
            }}
            alignItems={'center'}
          >
            <Grid item>
              <Typography variant={'h6'}>
                {`Are you sure you want to delete ${props.subjectName}?`}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>{'Cancel'}</Button>
          <Button
            onClick={() => {
              props.deleteClickHandler(props.firebaseId);
            }}
          >
            {'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export interface DeleteSubjectDialogProps {
  subjectName: string;
  firebaseId: string;
  deleteClickHandler: (id: string) => void;
}
