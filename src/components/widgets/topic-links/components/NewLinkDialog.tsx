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
import LinkForm from './LinkForm';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../../../../configs/redux/store';
import { Subject } from '../../../../configs/types/Subject';
import { saveLinkInfo } from '../../../../services/link-service';
import { closeNewLinkDialog } from '../../../../creators/topic-links/links-dialog';
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

export interface NewLinkForm {
  id: string;
  linkUrl: string;
  linkTitle: string;
  subjectId: string;
}

const NewLinkDialog = (props: NewLinkDialogProps): JSX.Element => {
  const classes = useStyles();

  const [values, setValues] = React.useState<NewLinkForm>({
    id: uuidv4(),
    linkUrl: '',
    linkTitle: '',
    subjectId: '',
  });

  const dropdownChangeHandler = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setValues((oldValues: NewLinkForm) => ({
      ...oldValues,
      [e.target.name as string]: e.target.value,
    }));
  };

  const textfieldChangeHandler = (name: keyof NewLinkForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const save = () => {
    props.saveClickHandler(values);
    setTimeout(() => {
      setValues({
        id: uuidv4(),
        linkUrl: '',
        linkTitle: '',
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
      <DialogTitle id={'new-link-dialog-title'}>
        {`Add New Link`}
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
            <Typography variant={'h6'}>{'Link Information'}</Typography>
          </Grid>

          <LinkForm
            dropdownChangeHandler={dropdownChangeHandler}
            textfieldChangeHandler={textfieldChangeHandler}
            linkValues={values}
            subjectList={props.subjectList}
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

export interface NewLinkDialogProps {
  open: boolean;
  displayName: string;
  closeDialogHandler: () => void;
  subjectList: Subject[];
  saveClickHandler: (link: NewLinkForm) => void;
}

const mapStateToProps = (state: State): NewLinkDialogProps => {
  return ({
    open: state.topicLinksState.displayNewLinkDialog,
    subjectList: state.subjectListState.subjectList,
  } as unknown) as NewLinkDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NewLinkDialogProps =>
  (({
    closeDialogHandler: () => {
      dispatch(closeNewLinkDialog());
    },
    saveClickHandler: (link: NewLinkForm) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(saveLinkInfo(link));
    },
  } as unknown) as NewLinkDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(NewLinkDialog);
