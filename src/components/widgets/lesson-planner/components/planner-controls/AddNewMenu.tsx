import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import LessonForm from '../lesson-form/LessonForm';
import LessonName from '../lesson-form/components/LessonName';
import { displayAppDialog } from '../../../../../creators/application/app-dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const AddNewMenu = (props: AddNewMenuProps): JSX.Element => {
  const classes = useStyles();

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
            <MenuItem onClick={popupState.close}>{'Weekly Planner'}</MenuItem>
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
}

const mapStateToProps = (state: any): AddNewMenuProps => {
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
  } as unknown) as AddNewMenuProps);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMenu);
