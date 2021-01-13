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
