import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import LessonForm from '../lesson-form/LessonForm';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-label': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const LessonDialog = (props: LessonDialogProps): JSX.Element => {
  return (
    <Button
      color={'primary'}
      variant={'contained'}
      startIcon={<AddIcon />}
      onClick={() => {
        props.displayAppDialogHandler(
          <LessonForm />,
          <CssTextField
            autoFocus
            id={'lesson-name'}
            variant={'outlined'}
            label={'Lesson Name'}
            style={{ width: '45%' }}
            // className={classes.margin}
          />
        );
      }}
    >
      {'Add New'}
    </Button>
  );
};

export interface LessonDialogProps {
  displayAppDialogHandler: (content: JSX.Element, title: JSX.Element) => void;
}

const mapStateToProps = (state: any): LessonDialogProps => {
  return ({} as unknown) as LessonDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LessonDialogProps =>
  (({
    displayAppDialogHandler: (content: JSX.Element, title: JSX.Element) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'lg',
          titleColor: '#3baafc',
          content: content,
          title: title,
          confirmButtonTitle: 'Save',
          confirmClickHandler: null,
        })
      );
    },
  } as unknown) as LessonDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonDialog);
