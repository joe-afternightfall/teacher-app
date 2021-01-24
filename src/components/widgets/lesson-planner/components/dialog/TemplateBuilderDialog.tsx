import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Tooltip } from '@material-ui/core';
import {
  editTemplate,
  saveNewTemplate,
} from '../../../../../services/template-builder-service';
import { State } from '../../../../../configs/redux/store';
import TemplateBuilderForm from '../lesson-form/TemplateBuilderForm';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';

const TemplateBuilderDialog = (
  props: TemplateBuilderDialogProps
): JSX.Element => {
  return (
    <Tooltip title={'Add New'}>
      <Fab
        color={'primary'}
        onClick={() => {
          props.displayAppDialogHandler(
            <TemplateBuilderForm />,
            'New Lesson',
            props.isNewTemplate
          );
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export interface TemplateBuilderDialogProps {
  displayAppDialogHandler: (
    content: JSX.Element,
    title: string,
    isNewTemplate: boolean
  ) => void;
  isNewTemplate: boolean;
}

const mapStateToProps = (state: State): TemplateBuilderDialogProps => {
  return ({
    isNewTemplate: Boolean(!state.lessonPlannerState.templateBuilder),
  } as unknown) as TemplateBuilderDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TemplateBuilderDialogProps =>
  (({
    displayAppDialogHandler: (
      content: JSX.Element,
      title: JSX.Element,
      isNewTemplate: boolean
    ) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'sm',
          titleColor: '#3baafc',
          content: content,
          title: title,
          confirmButtonTitle: 'Add Lesson',
          confirmClickHandler: async () => {
            if (isNewTemplate) {
              (dispatch as ThunkDispatch<State, void, AnyAction>)(
                saveNewTemplate()
              );
            } else {
              (dispatch as ThunkDispatch<State, void, AnyAction>)(
                editTemplate()
              );
            }
          },
        })
      );
    },
  } as unknown) as TemplateBuilderDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilderDialog);
