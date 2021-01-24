import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import LessonForm from '../lesson-form/LessonForm';
import { Button } from '@material-ui/core';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';
import { State } from '../../../../../configs/redux/store';
import LessonName from '../lesson-form/components/LessonName';

const NewLessonButton = (props: NewLessonButtonProps): JSX.Element => {
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

export interface NewLessonButtonProps {
  displayAppDialogHandler: (content: JSX.Element, title: JSX.Element) => void;
}

const mapStateToProps = (state: State): NewLessonButtonProps => {
  return ({} as unknown) as NewLessonButtonProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NewLessonButtonProps =>
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
  } as unknown) as NewLessonButtonProps);

export default connect(mapStateToProps, mapDispatchToProps)(NewLessonButton);
