import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SubjectDropdown from '../../../subject-related/subject-dropdown/SubjectDropdownConnector';
import { State } from '../../../../../configs/redux/store';
import { updateLessonSubject } from '../../../../../creators/lesson-planner';
import WeekdaySelectionGroup from './components/WeekdaySelectionGroup';
import StartAndEndTime from './components/StartAndEnd';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const TemplateBuilderForm = (props: TemplateBuilderFormProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={6}>
        <SubjectDropdown
          value={props.lessonSubjectId}
          changeHandler={props.dropdownChangeHandler}
        />
      </Grid>

      <Grid item xs={6}>
        <Grid item>
          <WeekdaySelectionGroup />
        </Grid>

        <Grid item>
          <StartAndEndTime />
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
