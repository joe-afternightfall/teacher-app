import React from 'react';
import { connect } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import SaveIcon from '@material-ui/icons/Save';
import { State } from '../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SquareIconButton from '../../../../../shared/SquareIconButton';
import { AppTheme } from '../../../../../../configs/theme/light-theme';
import { saveTemplateChanges } from '../../../../../../services/template-builder/save-template-changes';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.main,
      color: theme.palette.colors.offWhite,
    },
  })
);

const SaveTemplateButton = (
  props: SaveTemplateButtonProps
): JSX.Element => {
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

export interface SaveTemplateButtonProps {
  isDisabled: boolean;
  saveHandler: () => void;
}

const mapStateToProps = (state: State): SaveTemplateButtonProps => {
  return ({
    isDisabled: !state.templateBuilderState.boardChanged,
  } as unknown) as SaveTemplateButtonProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): SaveTemplateButtonProps =>
  (({
    saveHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        saveTemplateChanges()
      );
    },
  } as unknown) as SaveTemplateButtonProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveTemplateButton);
