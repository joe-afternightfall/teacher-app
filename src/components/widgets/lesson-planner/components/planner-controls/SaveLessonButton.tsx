import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import SaveIcon from '@material-ui/icons/Save';
import { Button, Tooltip } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { updateLessonBoardOrder } from '../../../../../services/template-builder-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const SaveLessonButton = (props: SaveLessonButtonProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Tooltip title={'Save Lesson'}>
      <Button
        color={'secondary'}
        variant={'contained'}
        onClick={() => {
          props.saveHandler();
        }}
        startIcon={<SaveIcon />}
        disabled={props.isDisabled}
      >
        {'Save'}
      </Button>
    </Tooltip>
  );
};

export interface SaveLessonButtonProps {
  isDisabled: boolean;
  saveHandler: () => void;
}

const mapStateToProps = (state: State): SaveLessonButtonProps => {
  return ({
    isDisabled: !state.lessonPlannerState.lessonBoardChanged,
  } as unknown) as SaveLessonButtonProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SaveLessonButtonProps =>
  (({
    saveHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        updateLessonBoardOrder()
      );
    },
  } as unknown) as SaveLessonButtonProps);

export default connect(mapStateToProps, mapDispatchToProps)(SaveLessonButton);
