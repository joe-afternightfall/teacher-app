import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TimeInput from './components/TimeInput';
import { Grid, Typography } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import WeekdaySelectionGroup from './components/WeekdaySelectionGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { updateLessonSubject } from '../../../../../creators/lesson-planner';
import SubjectDropdown from '../../../subject-related/subject-dropdown/SubjectDropdownConnector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const TemplateBuilderForm = (props: TemplateBuilderFormProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={6} style={{ margin: 'auto' }}>
          <SubjectDropdown
            value={props.lessonSubjectId}
            changeHandler={props.dropdownChangeHandler}
          />
        </Grid>

        <Grid item>
          <WeekdaySelectionGroup />
        </Grid>

        <Grid item>
          <TimeInput />
        </Grid>
      </Grid>
    </Grid>
  );
};

export interface TemplateBuilderFormProps {
  lessonSubjectId: string;
  dropdownChangeHandler: (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => void;
}

const mapStateToProps = (state: State): TemplateBuilderFormProps => {
  return ({
    lessonSubjectId: state.lessonPlannerState.lessonSubjectId,
  } as unknown) as TemplateBuilderFormProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TemplateBuilderFormProps =>
  (({
    dropdownChangeHandler: (
      e: React.ChangeEvent<{ name?: string; value: string }>
    ) => {
      dispatch(updateLessonSubject(e.target.value));
    },
  } as unknown) as TemplateBuilderFormProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilderForm);
