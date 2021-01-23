import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Button, Fab, Tooltip } from '@material-ui/core';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../../configs/redux/store';
import TemplateBuilderForm from '../lesson-form/TemplateBuilderForm';
import {
  editTemplate,
  saveNewTemplate,
} from '../../../../../services/template-builder-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

// const oldButton = () => {
//   return (
//     <Button
//       color={'primary'}
//       variant={'contained'}
//       startIcon={<AddIcon />}
//       onClick={() => {
//         props.displayAppDialogHandler(
//           <TemplateBuilderForm />,
//           'New Lesson Template'
//         );
//       }}
//     >
//       {'Add New'}
//     </Button>
//   )
// }

const TemplateBuilderDialog = (
  props: TemplateBuilderDialogProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <Tooltip title={'Add New'}>
      <Fab
        color={'primary'}
        onClick={() => {
          props.displayAppDialogHandler(
            <TemplateBuilderForm />,
            'New Lesson Template',
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
          maxWidth: 'lg',
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
