import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../configs/redux/store';
import {
  editSubject,
  saveSubjectInfo,
} from '../../../../services/subject-list-service';
import {
  clearSubjectInfoDialog,
  closeSubjectInfoDialog,
} from '../../../../creators/subject-list/subject-info-dialog';
import { clearEditing } from '../../../../creators/subject-list/editing-subject';

const SubjectInfoActionButtons = (
  props: SubjectInfoActionButtonsProps
): JSX.Element => {
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
            : props.saveSubjectClickHandler();
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
  closeSubjectInfoHandler: (isEditing: boolean) => void;
  saveSubjectClickHandler: () => void;
  editSubjectClickHandler: () => void;
}

const mapStateToProps = (state: State): SubjectInfoActionButtonsProps => {
  const listState = state.subjectListState;

  const isDisabled =
    listState.subjectNameError ||
    listState.subjectName === '' ||
    listState.selectedColor.id === '' ||
    listState.selectedIconId === '';

  return ({
    isDisabled: isDisabled,
    isEditing: listState.editingForm,
  } as unknown) as SubjectInfoActionButtonsProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): SubjectInfoActionButtonsProps =>
  (({
    saveSubjectClickHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(saveSubjectInfo());
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
