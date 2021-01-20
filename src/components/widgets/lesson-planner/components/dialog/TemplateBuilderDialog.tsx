import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import LessonForm from '../lesson-form/LessonForm';
import { Button } from '@material-ui/core';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../../configs/redux/store';
import { saveSubjectInfo } from '../../../../../services/subject-list-service';
import { saveTemplate } from '../../../../../services/template-builder-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const TemplateBuilderDialog = (
  props: TemplateBuilderDialogProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <Button
      color={'primary'}
      variant={'contained'}
      startIcon={<AddIcon />}
      onClick={() => {
        props.displayAppDialogHandler(<LessonForm />, 'New Lesson');
      }}
    >
      {'Add New'}
    </Button>
  );
};

export interface TemplateBuilderDialogProps {
  displayAppDialogHandler: (content: JSX.Element, title: string) => void;
}

const mapStateToProps = (state: any): TemplateBuilderDialogProps => {
  return ({} as unknown) as TemplateBuilderDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TemplateBuilderDialogProps =>
  (({
    displayAppDialogHandler: (content: JSX.Element, title: JSX.Element) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'lg',
          titleColor: '#3baafc',
          content: content,
          title: title,
          confirmButtonTitle: 'Add Lesson',
          confirmClickHandler: () => {
            (dispatch as ThunkDispatch<State, void, AnyAction>)(saveTemplate());
          },
        })
      );
    },
  } as unknown) as TemplateBuilderDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilderDialog);
