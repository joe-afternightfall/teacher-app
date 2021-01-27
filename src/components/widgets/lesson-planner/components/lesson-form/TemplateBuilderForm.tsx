import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TimeInput from './components/TimeInput';
import { Grid, TextField } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import WeekdaySelectionGroup from './components/WeekdaySelectionGroup';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SubjectDropdown from '../../../subject-related/subject-dropdown/SubjectDropdown';
import {
  updateLessonSubject,
  updateOtherLessonTypeName,
} from '../../../../../creators/lesson-planner/update-items';
import TypeCheckboxes from './components/TypeCheckboxes';

const useStyles = makeStyles(() =>
  createStyles({
    checkboxContainer: {
      textAlign: 'center',
    },
  })
);

const TemplateBuilderForm = (props: TemplateBuilderFormProps): JSX.Element => {
  const classes = useStyles();

  const isChecked =
    props.lessonType === 'other' || props.lessonType === 'subject';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.changeHandler(event.target.value);
  };

  return (
    <Grid container style={{ minHeight: '30vh' }}>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.checkboxContainer}>
          <TypeCheckboxes />
        </Grid>

        <Grid item xs={6} style={{ margin: 'auto' }}>
          {isChecked ? (
            props.lessonType === 'other' ? (
              <TextField
                fullWidth
                id={'activity-field'}
                label={'Other'}
                inputProps={{
                  name: 'activity',
                }}
                value={props.otherLessonTypeName}
                onChange={handleChange}
              />
            ) : (
              <SubjectDropdown
                value={props.lessonSubjectId}
                changeHandler={props.dropdownChangeHandler}
              />
            )
          ) : undefined}
        </Grid>

        {isChecked ? (
          <React.Fragment>
            <Grid item>
              <WeekdaySelectionGroup />
            </Grid>

            <Grid item>
              <TimeInput />
            </Grid>
          </React.Fragment>
        ) : undefined}
      </Grid>
    </Grid>
  );
};

export interface TemplateBuilderFormProps {
  lessonType: string;
  lessonSubjectId: string;
  otherLessonTypeName: string;
  changeHandler: (value: string) => void;
  dropdownChangeHandler: (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => void;
}

const mapStateToProps = (state: State): TemplateBuilderFormProps => {
  return ({
    lessonType: state.lessonPlannerState.lessonType,
    lessonSubjectId: state.lessonPlannerState.lessonSubjectId,
    otherLessonTypeName: state.lessonPlannerState.otherLessonTypeName,
  } as unknown) as TemplateBuilderFormProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TemplateBuilderFormProps =>
  (({
    dropdownChangeHandler: (
      e: React.ChangeEvent<{ name?: string; value: string }>
    ) => {
      dispatch(updateLessonSubject(e.target.value));
    },
    changeHandler: (value: string) => {
      dispatch(updateOtherLessonTypeName(value));
    },
  } as unknown) as TemplateBuilderFormProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilderForm);
