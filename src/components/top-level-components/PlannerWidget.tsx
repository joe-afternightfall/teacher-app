import React from 'react';
import {
  Card,
  Grid,
  Button,
  CardMedia,
  CardHeader,
  CardActions,
  CardActionArea,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../configs/redux/store';
import routes from '../../configs/constants/routes';
import { routerActions } from 'connected-react-router';
import plannerBackground from '../../configs/images/lovely-planning.jpg';

const PlannerWidget = (props: PlannerWidgetProps): JSX.Element => {
  return (
    <Card>
      <CardHeader title={'Weekly Planner'} />

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
}

const mapStateToProps = (state: State): PlannerWidgetProps => {
  return ({
    selectedPlannerId: state.applicationState.selectedPlannerId,
  } as unknown) as PlannerWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PlannerWidgetProps =>
  (({
    routeToWidgetClickHandler: () => {
      dispatch(routerActions.push(routes.WEEKLY_PLANNER));
    },
  } as unknown) as PlannerWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerWidget);
