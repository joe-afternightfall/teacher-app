import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import LessonForm from '../lesson-form/LessonForm';
import { Button } from '@material-ui/core';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';
import { State } from '../../../../../configs/redux/store';
import LessonName from '../lesson-form/components/LessonName';

const LessonDialog = (props: LessonDialogProps): JSX.Element => {
  return (
    <Button
      color={'primary'}
      variant={'contained'}
      startIcon={<AddIcon />}
      onClick={() => {
        props.displayAppDialogHandler(<LessonForm />, <LessonName />);
      }}
    >
      {'Add New'}
    </Button>
  );
};

export interface LessonDialogProps {
  displayAppDialogHandler: (content: JSX.Element, title: JSX.Element) => void;
}

const mapStateToProps = (state: State): LessonDialogProps => {
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
