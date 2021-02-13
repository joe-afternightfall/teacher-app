import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import AddIcon from '@material-ui/icons/Add';
import NewItemForm from '../../form/NewItemForm';
import { Button, Fab, Tooltip } from '@material-ui/core';
import { State } from '../../../../../../configs/redux/store';
import { displayAppDialog } from '../../../../../../creators/application/app-dialog';
import { saveNewTemplate } from '../../../../../../services/template-builder/save-new-template';
import { updateTemplate } from '../../../../../../services/template-builder/update-template-builder';

const FABNewTemplateButton = (props: NewTemplateButtonProps): JSX.Element => {
  return (
    <Tooltip title={'Add New'}>
      <Fab
        color={'primary'}
        onClick={() => {
          props.displayAppDialogHandler(
            <NewItemForm />,
            props.isNewTemplate
          );
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

const NewItemButton = (props: NewTemplateButtonProps): JSX.Element => {
  return (
    <Button
      color={'primary'}
      variant={'contained'}
      startIcon={<AddIcon />}
      onClick={() => {
        props.displayAppDialogHandler(
          <NewItemForm />,
          props.isNewTemplate
        );
      }}
    >
      {'Add New'}
    </Button>
  );
};

export interface NewTemplateButtonProps {
  displayAppDialogHandler: (
    content: JSX.Element,
    isNewTemplate: boolean
  ) => void;
  isNewTemplate: boolean;
}

const mapStateToProps = (state: State): NewTemplateButtonProps => {
  return ({
    isNewTemplate: Boolean(!state.templateBuilderState.templateBuilder),
  } as unknown) as NewTemplateButtonProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NewTemplateButtonProps =>
  (({
    displayAppDialogHandler: (content: JSX.Element, isNewTemplate: boolean) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'sm',
          titleColor: '#3baafc',
          content: content,
          title: 'Add Item to Template',
          confirmButtonTitle: 'Save',
          confirmClickHandler: async () => {
            if (isNewTemplate) {
              (dispatch as ThunkDispatch<State, void, AnyAction>)(
                saveNewTemplate()
              );
            } else {
              (dispatch as ThunkDispatch<State, void, AnyAction>)(
                updateTemplate()
              );
            }
          },
        })
      );
    },
  } as unknown) as NewTemplateButtonProps);

export default connect(mapStateToProps, mapDispatchToProps)(NewItemButton);
