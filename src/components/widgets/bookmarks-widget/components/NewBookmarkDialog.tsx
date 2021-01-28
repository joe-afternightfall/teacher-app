import React from 'react';
import {
  Grid,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import BookmarkForm from './BookmarkForm';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../../../../configs/redux/store';
import { Subject } from '../../../../configs/types/Subject';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { closeNewBookmarkDialog } from '../../../../creators/bookmarks/bookmarks-dialog';
import { saveBookmarkInfo } from '../../../../services/bookmarks/save-bookmark';

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

export interface NewBookmarkForm {
  id: string;
  bookmarkUrl: string;
  bookmarkTitle: string;
  subjectId: string;
}

const NewBookmarkDialog = (props: NewBookmarkDialogProps): JSX.Element => {
  const classes = useStyles();

  const [values, setValues] = React.useState<NewBookmarkForm>({
    id: uuidv4(),
    bookmarkUrl: '',
    bookmarkTitle: '',
    subjectId: '',
  });

  const dropdownChangeHandler = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setValues((oldValues: NewBookmarkForm) => ({
      ...oldValues,
      [e.target.name as string]: e.target.value,
    }));
  };

  const textfieldChangeHandler = (name: keyof NewBookmarkForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const save = () => {
    props.saveClickHandler(values);
    setTimeout(() => {
      setValues({
        id: uuidv4(),
        bookmarkUrl: '',
        bookmarkTitle: '',
        subjectId: '',
      });
    }, 4000);
  };

  return (
    <Dialog
      maxWidth={'sm'}
      fullWidth={true}
      open={props.open}
      onClose={props.closeDialogHandler}
    >
      <DialogTitle id={'new-bookmark-dialog-title'}>
        {`Add New Bookmark`}
        <IconButton
          aria-label={'close'}
          className={classes.closeButton}
          onClick={props.closeDialogHandler}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ margin: '24px 0' }}>
        <Grid container justify={'center'} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h6'}>{'Bookmark Information'}</Typography>
          </Grid>

          <BookmarkForm
            dropdownChangeHandler={dropdownChangeHandler}
            textfieldChangeHandler={textfieldChangeHandler}
            bookmarkValues={values}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeDialogHandler}>{'Cancel'}</Button>
        <Button onClick={save}>{'Save'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export interface NewBookmarkDialogProps {
  open: boolean;
  displayName: string;
  closeDialogHandler: () => void;
  subjectList: Subject[];
  saveClickHandler: (bookmark: NewBookmarkForm) => void;
}

const mapStateToProps = (state: State): NewBookmarkDialogProps => {
  return ({
    open: state.bookmarksState.displayNewBookmarkDialog,
    subjectList: state.subjectListState.subjectList,
  } as unknown) as NewBookmarkDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NewBookmarkDialogProps =>
  (({
    closeDialogHandler: () => {
      dispatch(closeNewBookmarkDialog());
    },
    saveClickHandler: (bookmark: NewBookmarkForm) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        saveBookmarkInfo(bookmark)
      );
    },
  } as unknown) as NewBookmarkDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(NewBookmarkDialog);
