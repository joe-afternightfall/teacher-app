import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { State } from '../../../../configs/redux/store';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { displayAppDialog } from '../../../../creators/application/app-dialog';
import { deleteSubject } from '../../../../services/subject-list/delete-subject';

const useStyles = makeStyles(() =>
  createStyles({
    deleteButton: {
      marginLeft: 12,
    },
  })
);

const DeleteSubjectDialog = (props: DeleteSubjectDialogProps): JSX.Element => {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.deleteButton}
      edge={'end'}
      aria-label={'delete'}
      data-testid={`delete-${props.subjectName}`}
      onClick={() => {
        props.displayAppDialogHandler(
          <Grid
            container
            spacing={2}
            justify={'center'}
            direction={'column'}
            style={{
              minHeight: '30vh',
            }}
            alignItems={'center'}
          >
            <Grid item>
              <Typography variant={'h6'}>
                {`Are you sure you want to delete ${props.subjectName}?`}
              </Typography>
            </Grid>
          </Grid>,
          () => {
            props.deleteClickHandler(props.firebaseId);
          }
        );
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export interface DeleteSubjectDialogProps {
  subjectName: string;
  firebaseId: string;
  deleteClickHandler: (id: string) => void;
  displayAppDialogHandler: (
    content: JSX.Element,
    clickHandler: (id: string) => void
  ) => void;
}

const mapStateToProps = (): DeleteSubjectDialogProps => {
  return ({} as unknown) as DeleteSubjectDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): DeleteSubjectDialogProps =>
  (({
    displayAppDialogHandler: (
      content: JSX.Element,
      clickHandler: (id: string) => void
    ) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'sm',
          titleColor: '',
          content: content,
          title: '',
          confirmButtonTitle: 'Delete',
          confirmClickHandler: clickHandler,
        })
      );
    },
    deleteClickHandler: (id: string) => {
      console.log('DELETING_ID = ' + id);
      (dispatch as ThunkDispatch<State, void, AnyAction>)(deleteSubject(id));
    },
  } as unknown) as DeleteSubjectDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteSubjectDialog);
