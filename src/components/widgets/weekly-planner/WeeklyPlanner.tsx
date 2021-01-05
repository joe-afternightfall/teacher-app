import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  MovePlannerResult,
  Planner,
  PlannerItem,
  PlannerItems,
} from '../../../configs/types/WeeklyPlanner';
import ColumnList from './components/ColumnList';
import TimeColumn from './components/TimeColumn';
import PlannerControls from './components/PlannerControls';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { move, reorder, updateAllItems } from '../../../utils/weekly-schedule';
import { getAllWeeklyPlanners } from '../../../services/weekly-planner';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class WeeklyPlanner extends Component<WeeklyPlannerProps> {
  async componentDidMount() {
    const planners = await getAllWeeklyPlanners();

    this.props.loadWeeklyPlannersHandler(planners);
  }

  render(): JSX.Element {
    const { selectedPlanner } = this.props;
    const plannerItems = selectedPlanner.items;

    const getList = (dayOfWeek: string): PlannerItem[] => {
      return plannerItems[dayOfWeek].items;
    };

    const onDragEnd = (result: DropResult): void => {
      const { source, destination } = result;
      const dayOfWeek = source.droppableId;

      if (!destination) {
        return;
      }

      if (dayOfWeek === destination.droppableId) {
        const reorderedItems = reorder(
          getList(dayOfWeek),
          source.index,
          destination.index
        );

        this.props.reorderHandler(reorderedItems, dayOfWeek);
      } else {
        const resultFromMove: MovePlannerResult = move(
          getList(dayOfWeek),
          getList(destination.droppableId),
          source,
          destination
        );

        const updatedItems: PlannerItems = updateAllItems(
          resultFromMove,
          selectedPlanner
        );

        this.props.moveHandler(updatedItems);
      }
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <PlannerControls />

        <Grid container justify={'center'} spacing={1}>
          <TimeColumn />

          <ColumnList
            dayOfWeek={'monday'}
            plannerDay={plannerItems.monday}
            color={'#f40407'}
          />
          <ColumnList
            dayOfWeek={'tuesday'}
            plannerDay={plannerItems.tuesday}
            color={'#f5b90f'}
          />
          <ColumnList
            dayOfWeek={'wednesday'}
            plannerDay={plannerItems.wednesday}
            color={'#6ecb3a'}
          />
          <ColumnList
            dayOfWeek={'thursday'}
            plannerDay={plannerItems.thursday}
            color={'#06aceb'}
          />
          <ColumnList
            dayOfWeek={'friday'}
            plannerDay={plannerItems.friday}
            color={'#993cba'}
          />
        </Grid>
      </DragDropContext>
    );
  }
}

export interface WeeklyPlannerProps extends WithStyles<typeof styles> {
  selectedPlanner: Planner;
  reorderHandler: (items: PlannerItem[], sourceId: string) => void;
  moveHandler: (items: PlannerItems) => void;
  loadWeeklyPlannersHandler: (planners: any) => Planner[];
}

export default withStyles(styles, { withTheme: true })(WeeklyPlanner);
