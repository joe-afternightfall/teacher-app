import React from 'react';
import {
  Card,
  Grid,
  Button,
  CardMedia,
  CardHeader,
  CardActions,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../configs/redux/store';
import routes from '../../configs/constants/routes';
import { routerActions } from 'connected-react-router';
import plannerBackground from '../../configs/images/lovely-planning.jpg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Subject } from '../../configs/types/WeeklyPlanner';

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
        action={
          <div>
            <IconButton
              aria-controls={'simple-menu'}
              aria-haspopup={'true'}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              keepMounted
              id={'simple-menu'}
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
              <MenuItem onClick={handleClose}>{'Profile'}</MenuItem>
              <MenuItem onClick={handleClose}>{'My account'}</MenuItem>
              <MenuItem onClick={handleClose}>{'Logout'}</MenuItem>
            </Menu>
          </div>
        }
        title={'Weekly Planners'}
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

      {props.subjectList.map((subject) => {
        return subject.name;
      })}

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
