import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, SvgIconTypeMap } from '@material-ui/core';
import {
  closeSubjectInfoDialog,
  saveSubjectInfo,
} from '../../../../creators/subject-list';
import { Subject } from '../../../../configs/types/WeeklyPlanner';
import { State } from '../../../../configs/redux/store';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
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
      <Button color={'primary'} onClick={props.saveSubjectClickHandler}>
        {'Save'}
      </Button>
    </React.Fragment>
  );
};

export interface SubjectListActionButtonsProps {
  getState: () => State;
  saveSubjectClickHandler: () => void;
  closeSubjectInfoHandler: () => void;
}

const mapStateToProps = (state: State): SubjectListActionButtonsProps => {
  return ({} as unknown) as SubjectListActionButtonsProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  getState: any
): SubjectListActionButtonsProps =>
  (({
    saveSubjectClickHandler: () => {
      const subjectState = getState().subjectListState;
      const selectedColor = subjectState.selectedColor;
      const subject = {
        // todo:  add guid generator for ID
        id: '',
        subjectName: subjectState.subjectName,
        primaryColorId: selectedColor.id,
        primaryColor: selectedColor.primaryColor,
        secondaryColor: selectedColor.secondaryColor,
        icon: subjectState.selectedIcon,
      };

      console.log('subject: ' + JSON.stringify(subject));

      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        dispatch(saveSubjectInfo(subject))
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
