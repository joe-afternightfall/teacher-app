import React from 'react';
import {
  Menu,
  Card,
  Grid,
  Button,
  MenuItem,
  CardHeader,
  IconButton,
  CardActions,
  CardContent,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../configs/redux/store';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { routerActions } from 'connected-react-router';
import { routes } from '../../../../configs/constants/routes';
import { clearSubjectBuilderDialog } from '../../../../creators/subject-list/subject-builder-dialog';
import { clearEditing } from '../../../../creators/subject-list/editing-subject';

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
              <MenuItem
                onClick={() => {
                  props.routeToTemplateBuilderHandler();
                }}
              >
                {'Template Builder'}
              </MenuItem>
            </Menu>
          </div>
        }
      />

      <CardContent style={{ minHeight: 80 }} />

      <CardActions>
        <Grid container align-items={'center'} justify={'flex-end'}>
          <Grid item>
            <Button onClick={props.routeToLessonPlannerClickHandler}>
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
  subheaderMessage: string;
  clearDialogHandler: () => void;
  routeToTemplateBuilderHandler: () => void;
  routeToLessonPlannerClickHandler: () => void;
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
  } as unknown) as PlannerWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PlannerWidgetProps =>
  (({
    clearDialogHandler: () => {
      dispatch(clearSubjectBuilderDialog());
      dispatch(clearEditing());
    },
    routeToLessonPlannerClickHandler: () => {
      dispatch(routerActions.push(routes.LESSON_PLANNER.path));
    },
    routeToTemplateBuilderHandler: () => {
      dispatch(routerActions.push(routes.TEMPLATE_BUILDER.path));
    },
  } as unknown) as PlannerWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlannerCard);
