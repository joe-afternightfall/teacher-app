import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TimeInput from './components/TimeInput';
import { Grid, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import WeekdaySelectionGroup from './components/WeekdaySelectionGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SubjectDropdown from '../../../subject-related/subject-dropdown/SubjectDropdownConnector';
import { updateLessonSubject } from '../../../../../creators/lesson-planner/update-items';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkboxContainer: {
      textAlign: 'center',
    },
  })
);

const TemplateBuilderForm = (props: TemplateBuilderFormProps): JSX.Element => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState<string>('');

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(`${e.target.name}-${e.target.checked}`);
  };

  const isChecked = checked === 'activity-true' || checked === 'subject-true';

  return (
    <Grid container style={{ minHeight: '30vh' }}>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.checkboxContainer}>
          <FormControlLabel
            control={
              <Checkbox
                name={'activity'}
                checked={checked === 'activity-true'}
                onChange={handleCheck}
              />
            }
            label={'Activity'}
          />

          <FormControlLabel
            control={
              <Checkbox
                name={'subject'}
                checked={checked === 'subject-true'}
                onChange={handleCheck}
              />
            }
            label={'Subject'}
          />
        </Grid>

        <Grid item xs={6} style={{ margin: 'auto' }}>
          {isChecked ? (
            checked === 'activity-true' ? (
              <TextField
                fullWidth
                id={'activity-field'}
                label={'Activity Name'}
                inputProps={{
                  name: 'activity',
                }}
                // value={this.state.title}
                // onChange={handleChange}
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
