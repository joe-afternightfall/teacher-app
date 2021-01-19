import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { State } from '../../../../../../configs/redux/store';
import { updateLessonName } from '../../../../../../creators/lesson-planner';

const CustomTextfield = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-label': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const LessonName = (props: LessonNameProps): JSX.Element => {
  return (
    <CustomTextfield
      autoFocus
      id={'lesson-name'}
      variant={'outlined'}
      label={'Lesson Name'}
      style={{ width: '45%' }}
      // className={classes.margin}
      onChange={props.changeHandler}
      value={props.lessonName}
    />
  );
};

export interface LessonNameProps {
  lessonName: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const mapStateToProps = (state: State): LessonNameProps => {
  return ({
    lessonName: state.lessonPlannerState.lessonName,
  } as unknown) as LessonNameProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LessonNameProps =>
  (({
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateLessonName(e.target.value));
    },
  } as unknown) as LessonNameProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonName);
