import React from 'react';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import LessonForm from '../lesson-form/LessonForm';
import PlannerNameAndDate from './PlannerNameAndDate';
import { State } from '../../../../../configs/redux/store';
import LessonName from '../lesson-form/components/LessonName';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';
import { addNewFromTemplate } from '../../../../../services/lesson-planner/add-new';

const AddNewMenu = (props: AddNewMenuProps): JSX.Element => {
  return (
    <PopupState variant={'popover'} popupId={'demo-popup-menu'}>
      {(popupState) => (
        <React.Fragment>
          <Button
            startIcon={<AddIcon />}
            variant={'contained'}
            color={'primary'}
            {...bindTrigger(popupState)}
          >
            {'Add New'}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                popupState.close();
                props.newPlannerClickHandler(<PlannerNameAndDate />);
              }}
            >
              {'Weekly Planner'}
            </MenuItem>
            <MenuItem
              onClick={() => {
                popupState.close();
                props.newItemClickHandler(<LessonForm />, <LessonName />);
              }}
            >
              {'Lesson Item'}
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export interface AddNewMenuProps {
  newItemClickHandler: (content: JSX.Element, title: JSX.Element) => void;
  newPlannerClickHandler: (content: JSX.Element) => void;
}

const mapStateToProps = (): AddNewMenuProps => {
  return ({} as unknown) as AddNewMenuProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AddNewMenuProps =>
  (({
    newItemClickHandler: (content: JSX.Element, title: JSX.Element) => {
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
    newPlannerClickHandler: (content: JSX.Element) => {
      dispatch(
        displayAppDialog({
          maxWidth: 'sm',
          titleColor: '#3baafc',
          content: content,
          title: 'New Weekly Planner',
          confirmButtonTitle: 'Create Planner',
          confirmClickHandler: () => {
            (dispatch as ThunkDispatch<State, void, AnyAction>)(
              addNewFromTemplate()
            );
          },
        })
      );
    },
  } as unknown) as AddNewMenuProps);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMenu);
