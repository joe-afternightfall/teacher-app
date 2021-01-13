import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  saveSubjectInfo,
  closeSubjectInfoDialog,
  clearSubjectInfoDialog,
  clearEditing,
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
  props: SubjectListActionButtonsProps
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
      >
        {props.isEditing ? 'Save Changes' : 'Save'}
      </Button>
    </React.Fragment>
  );
};

export interface SubjectListActionButtonsProps {
  isEditing: boolean;
  subject: Subject;
  closeSubjectInfoHandler: (isEditing: boolean) => void;
  saveSubjectClickHandler: (subject: Subject) => void;
  editSubjectClickHandler: () => void;
}

const mapStateToProps = (state: State): SubjectListActionButtonsProps => {
  const subject = {
    id: uuidv4(),
    subjectName: state.subjectListState.subjectName,
    primaryColorId: state.subjectListState.selectedColor.id,
    primaryColor: state.subjectListState.selectedColor.primaryColor,
    secondaryColor: state.subjectListState.selectedColor.secondaryColor,
    iconId: state.subjectListState.selectedIconId,
  };

  return ({
    subject: subject,
    isEditing: state.subjectListState.editingForm,
  } as unknown) as SubjectListActionButtonsProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): SubjectListActionButtonsProps =>
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
      alert('is editing');
    },
  } as unknown) as SubjectListActionButtonsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectInfoActionButtons);
