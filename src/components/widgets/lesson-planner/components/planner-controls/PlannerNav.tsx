import React from 'react';
import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../configs/redux/store';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LessonPlanner } from '../../../../../configs/models/LessonPlanner';
import { selectLessonById } from '../../../../../creators/lesson-planner/select-lesson';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const PlannerNav = (props: PlannerNavProps): JSX.Element => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.selectHandler(event.target.value as string);
  };

  return (
    <Grid container alignItems={'center'} spacing={2}>
      <Grid item>
        <Button variant={'contained'} color={'primary'}>
          <ArrowBack />
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '0px 8px 8px 8px' }}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel id={'current-week'}>{'Current Week'}</InputLabel>
            <Select
              value={props.selectedLessonId}
              onChange={handleChange}
              labelId={'current-week'}
              id={'current-week'}
            >
              {props.lessonPlanners &&
                props.lessonPlanners.map((lesson, index) => (
                  <MenuItem key={index} value={lesson.id}>
                    {lesson.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      <Grid item>
        <Button variant={'contained'} color={'primary'}>
          <ArrowForward />
        </Button>
      </Grid>
    </Grid>
  );
};

export interface PlannerNavProps {
  lessonPlanners: LessonPlanner[];
  selectedLessonId: string;
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
