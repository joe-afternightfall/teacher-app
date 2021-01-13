import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  saveSubjectInfo,
  closeSubjectInfoDialog,
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

const SubjectListActionButtons = (
  props: SubjectListActionButtonsProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button
        color={'secondary'}
        onClick={() => {
          props.closeSubjectInfoHandler();
        }}
      >
        {'Cancel'}
      </Button>
      <Button
        color={'primary'}
        onClick={() => {
          props.saveSubjectClickHandler(props.subject);
        }}
      >
        {'Save'}
      </Button>
    </React.Fragment>
  );
};

export interface SubjectListActionButtonsProps {
  subject: Subject;
  closeSubjectInfoHandler: () => void;
  saveSubjectClickHandler: (subject: Subject) => void;
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
    closeSubjectInfoHandler: () => {
      dispatch(closeSubjectInfoDialog());
    },
  } as unknown) as SubjectListActionButtonsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectListActionButtons);
