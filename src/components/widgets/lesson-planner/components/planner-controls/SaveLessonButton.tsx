import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Tooltip } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { State } from '../../../../../configs/redux/store';
import SquareIconButton from '../../../../shared/SquareIconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../../../../../configs/theme/light-theme';
import { updateLessonBoardOrder } from '../../../../../services/template-builder/update-board-order';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.main,
      color: theme.palette.colors.offWhite,
    },
  })
);

const SaveLessonButton = (props: SaveLessonButtonProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Tooltip title={'Save Lesson'}>
      <SquareIconButton
        disabled={props.isDisabled}
        icon={<SaveIcon />}
        clickHandler={props.saveHandler}
        customStyle={classes.root}
      />
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
