import React from 'react';
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../configs/redux/store';
import { LessonPlanner } from '../../../../../configs/models/LessonPlanner';
import { selectLessonById } from '../../../../../creators/lesson-planner/select-lesson';

const PlannerNav = (props: PlannerNavProps): JSX.Element => {
  const { lessonPlanners, selectedLessonId } = props;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.selectHandler(event.target.value as string);
  };

  return (
    <Grid container alignItems={'center'} spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: 8 }}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel id={'current-week'}>{'Current Week'}</InputLabel>
            <Select
              value={selectedLessonId}
              onChange={handleChange}
              labelId={'current-week'}
              id={'current-week'}
            >
              {lessonPlanners &&
                lessonPlanners.map((lesson, index) => (
                  <MenuItem key={index} value={lesson.id}>
                    {lesson.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
};

export interface PlannerNavProps {
  selectedLessonId: string;
  lessonPlanners: LessonPlanner[];
  selectHandler: (id: string) => void;
}

const mapStateToProps = (state: State): PlannerNavProps => {
  return ({
    lessonPlanners: state.lessonPlannerState.lessonPlanners,
    selectedLessonId: state.lessonPlannerState.selectedLessonId,
  } as unknown) as PlannerNavProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PlannerNavProps =>
  (({
    selectHandler: (id: string) => {
      dispatch(selectLessonById(id));
    },
  } as unknown) as PlannerNavProps);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerNav);
