import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LessonDialog from './dialog/LessonDialog';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { State } from '../../../../configs/redux/store';
import { updateLessonSubject } from '../../../../creators/lesson-planner';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { displayAppDialog } from '../../../../creators/application/app-dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

const PlannerControls = (props: PlannerControlsProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems={'center'}
      justify={'space-between'}
      className={classes.root}
    >
      <Grid item xs={6}>
        <Grid container alignItems={'center'} spacing={2}>
          <Grid item>
            <Button variant={'contained'} color={'secondary'}>
              <ArrowBack />
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '0 8px 8px 8px' }}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel id={'current-week'}>{'Current Week'}</InputLabel>
                <Select labelId={'current-week'} id={'current-week'}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item>
            <Button variant={'contained'} color={'secondary'}>
              <ArrowForward />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <LessonDialog
          subjectId={props.lessonSubjectId}
          displayAppDialogHandler={props.displayAppDialogHandler}
          dropdownChangeHandler={props.dropdownChangeHandler}
        />
      </Grid>
    </Grid>
  );
};

export interface PlannerControlsProps {
  displayAppDialogHandler: (content: JSX.Element) => void;
  lessonSubjectId: string;
  dropdownChangeHandler: (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => void;
}

const mapStateToProps = (state: State): PlannerControlsProps => {
  return ({
    lessonSubjectId: state.lessonPlannerState.lessonSubjectId,
  } as unknown) as PlannerControlsProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): PlannerControlsProps =>
  (({
    displayAppDialogHandler: (content: JSX.Element, title: JSX.Element) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'lg',
          titleColor: '#3baafc',
          content: content,
          title: title,
          confirmButtonTitle: 'Save',
          confirmClickHandler: null,
        })
      );
    },
    dropdownChangeHandler: (
      e: React.ChangeEvent<{ name?: string; value: string }>
    ) => {
      dispatch(updateLessonSubject(e.target.value));
    },
  } as unknown) as PlannerControlsProps);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerControls);
