import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  saveSubjectInfo,
  closeSubjectInfoDialog,
  clearSubjectInfoDialog,
  clearEditing,
  editSubject,
} from '../../../../creators/subject-list';
import { Button } from '@material-ui/core';
import { State } from '../../../../configs/redux/store';
import { Subject } from '../../../../configs/types/Subject';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThunkDispatch } from 'redux-thunk';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const SubjectInfoActionButtons = (
  props: SubjectInfoActionButtonsProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button
        color={'secondary'}
        onClick={() => {
          props.closeSubjectInfoHandler(props.isEditing);
        }}
      >
        {'Cancel'}
      </Button>
      <Button
        color={'primary'}
        onClick={() => {
          props.isEditing
            ? props.editSubjectClickHandler()
            : props.saveSubjectClickHandler(props.subject);
        }}
        disabled={props.isDisabled}
      >
        {props.isEditing ? 'Save Changes' : 'Save'}
      </Button>
    </React.Fragment>
  );
};

export interface SubjectInfoActionButtonsProps {
  isEditing: boolean;
  isDisabled: boolean;
  subject: Subject;
  closeSubjectInfoHandler: (isEditing: boolean) => void;
  saveSubjectClickHandler: (subject: Subject) => void;
  editSubjectClickHandler: () => void;
}

const mapStateToProps = (state: State): SubjectInfoActionButtonsProps => {
  const subject = {
    id: uuidv4(),
    subjectName: state.subjectListState.subjectName,
    primaryColorId: state.subjectListState.selectedColor.id,
    primaryColor: state.subjectListState.selectedColor.primaryColor,
    secondaryColor: state.subjectListState.selectedColor.secondaryColor,
    iconId: state.subjectListState.selectedIconId,
  };

  let isDisabled;

  if (state.subjectListState.subjectNameError) {
    isDisabled = true;
  } else if (state.subjectListState.subjectName === '') {
    isDisabled = true;
  } else if (state.subjectListState.selectedColor.id === '') {
    isDisabled = true;
  } else if (state.subjectListState.selectedIconId === '') {
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  return ({
    isDisabled: isDisabled,
    subject: subject,
    isEditing: state.subjectListState.editingForm,
  } as unknown) as SubjectInfoActionButtonsProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): SubjectInfoActionButtonsProps =>
  (({
    saveSubjectClickHandler: (subject: Subject) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        saveSubjectInfo(subject)
      );
    },
    closeSubjectInfoHandler: (isEditing: boolean) => {
      if (isEditing) {
        dispatch(clearSubjectInfoDialog());
        dispatch(clearEditing());
      }
      dispatch(closeSubjectInfoDialog());
    },
    editSubjectClickHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(editSubject());
    },
  } as unknown) as SubjectInfoActionButtonsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectInfoActionButtons);
