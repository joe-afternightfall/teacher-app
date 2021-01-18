import React from 'react';
import {
  Menu,
  Card,
  Grid,
  Button,
  MenuItem,
  CardMedia,
  CardHeader,
  IconButton,
  CardActions,
  CardActionArea,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SubjectListDialog from './SubjectListDialog';
import { State } from '../../../../configs/redux/store';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { routerActions } from 'connected-react-router';
import routes from '../../../../configs/constants/routes';
import {
  clearSubjectInfoDialog,
  closeSubjectInfoDialog,
  openSubjectInfoDialog,
} from '../../../../creators/subject-list/subject-info-dialog';
import { clearEditing } from '../../../../creators/subject-list/editing-subject';
import plannerBackground from '../../../../configs/images/lovely-planning.jpg';

const LessonPlannerCard = (props: PlannerWidgetProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (props.isEditing) {
      props.clearDialogHandler();
    }
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        title={'Weekly Planners'}
        subheader={props.subheaderMessage}
        action={
          <div>
            <IconButton
              aria-controls={'planner-menu'}
              aria-haspopup={'true'}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              keepMounted
              id={'planner-menu'}
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
              <SubjectListDialog
                isEditing={props.isEditing}
                displayLoader={props.displayLoader}
                closeMenuClickHandler={handleClose}
                openSubjectInfoHandler={props.openSubjectInfoHandler}
                closeSubjectInfoHandler={props.closeSubjectInfoHandler}
                shouldDisplaySubjectInfo={props.shouldDisplaySubjectInfo}
              />
              <MenuItem onClick={handleClose}>{'My account'}</MenuItem>
              <MenuItem onClick={handleClose}>{'Logout'}</MenuItem>
            </Menu>
          </div>
        }
      />

      <CardActionArea>
        <CardMedia
          style={{
            height: 200,
          }}
          image={plannerBackground}
          title={'Weekly Planner'}
          onClick={props.routeToWidgetClickHandler}
        />
      </CardActionArea>

      <CardActions>
        <Grid container align-items={'center'} justify={'flex-end'}>
          <Grid item>
            <Button onClick={props.routeToWidgetClickHandler}>
              {'View Planner'}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

interface PlannerWidgetProps {
  isEditing: boolean;
  displayLoader: boolean;
  subheaderMessage: string;
  shouldDisplaySubjectInfo: boolean;
  openSubjectInfoHandler: () => void;
  routeToWidgetClickHandler: () => void;
  closeSubjectInfoHandler: () => void;
  clearDialogHandler: () => void;
}

const mapStateToProps = (state: State): PlannerWidgetProps => {
  const subjects = state.subjectListState.subjectList;
  const numberOfSubjects = subjects && subjects.length;
  let subheaderMessage = '';

  if (numberOfSubjects === 0 || numberOfSubjects === undefined) {
    subheaderMessage = 'No Subjects';
  } else if (numberOfSubjects === 1) {
    subheaderMessage = '1 Subject';
  } else {
    subheaderMessage = `${numberOfSubjects} Subjects`;
  }

  return ({
    isEditing: state.subjectListState.editingForm,
    subheaderMessage: subheaderMessage,
    shouldDisplaySubjectInfo: state.subjectListState.displaySubjectInfo,
    displayLoader: state.subjectListState.displayLoader,
  } as unknown) as PlannerWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PlannerWidgetProps =>
  (({
    clearDialogHandler: () => {
      dispatch(clearSubjectInfoDialog());
      dispatch(clearEditing());
    },
    routeToWidgetClickHandler: () => {
      dispatch(routerActions.push(routes.WEEKLY_PLANNER));
    },
    openSubjectInfoHandler: () => {
      dispatch(openSubjectInfoDialog());
    },
    closeSubjectInfoHandler: () => {
      dispatch(closeSubjectInfoDialog());
    },
  } as unknown) as PlannerWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlannerCard);
