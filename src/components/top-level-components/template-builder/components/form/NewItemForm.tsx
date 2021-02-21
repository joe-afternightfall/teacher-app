import React from 'react';
import { Dispatch } from 'redux';
import TimeInput from './TimeInput';
import { connect } from 'react-redux';
import TypeCheckboxes from './TypeCheckboxes';
import { Grid, TextField } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import WeekdaySelectionGroup from './WeekdaySelectionGroup';
import SubjectDropdown from '../../../../shared/SubjectDropdown';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  updateLessonSubject,
  updateOtherLessonTypeName,
} from '../../../../../creators/template-builder/builder';

const useStyles = makeStyles(() =>
  createStyles({
    checkboxContainer: {
      textAlign: 'center',
    },
  })
);

const NewItemForm = (props: TemplateBuilderFormProps): JSX.Element => {
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
                label={'Other'}
                inputProps={{
                  name: 'activity',
                  'data-testid': 'activity-textfield',
                }}
                onChange={handleChange}
                data-testid={'activity-field'}
                value={props.otherLessonTypeName}
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
    lessonType: state.templateBuilderState.lessonType,
    lessonSubjectId: state.templateBuilderState.lessonSubjectId,
    otherLessonTypeName: state.templateBuilderState.otherLessonTypeName,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm);
