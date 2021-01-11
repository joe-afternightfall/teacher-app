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
import { State } from '../../../configs/redux/store';
import routes from '../../../configs/constants/routes';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { routerActions } from 'connected-react-router';
import { Subject } from '../../../configs/types/WeeklyPlanner';
import SubjectListDialog from './subject-list/SubjectListDialog';
import plannerBackground from '../../configs/images/lovely-planning.jpg';

const PlannerWidget = (props: PlannerWidgetProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        title={'Weekly Planners'}
        subheader={`${props.subjectList.length} Subjects`}
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
              <SubjectListDialog closeMenuClickHandler={handleClose} />
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
  routeToWidgetClickHandler: () => void;
  subjectList: Subject[];
}

const mapStateToProps = (state: State): PlannerWidgetProps => {
  return ({
    selectedPlannerId: state.weeklyPlannerState.selectedPlannerId,
    subjectList: state.weeklyPlannerState.subjectList,
  } as unknown) as PlannerWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PlannerWidgetProps =>
  (({
    routeToWidgetClickHandler: () => {
      dispatch(routerActions.push(routes.WEEKLY_PLANNER));
    },
  } as unknown) as PlannerWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerWidget);
