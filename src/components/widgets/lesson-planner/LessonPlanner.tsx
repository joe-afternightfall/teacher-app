import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import Column from './components/Column';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  Lesson,
  LessonItem,
  LessonItems,
  MoveLessonResult,
} from '../../../configs/types/LessonPlanner';
import TimeColumn from './components/TimeColumn';
import PlannerControls from './components/PlannerControls';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { getAllLessonPlanners } from '../../../services/lesson-planner-service';
import { move, reorder, updateAllItems } from '../../../utils/weekly-schedule';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class LessonPlanner extends Component<LessonPlannerProps> {
  async componentDidMount() {
    const planners = await getAllLessonPlanners();

    this.props.loadLessonPlannersHandler(planners);
  }

  render(): JSX.Element {
    const { selectedPlanner } = this.props;
    const plannerItems = selectedPlanner.items;

    const getList = (dayOfWeek: string): LessonItem[] => {
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
        const resultFromMove: MoveLessonResult = move(
          getList(dayOfWeek),
          getList(destination.droppableId),
          source,
          destination
        );

        const updatedItems: LessonItems = updateAllItems(
          resultFromMove,
          selectedPlanner
        );

        this.props.moveHandler(updatedItems);
      }
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <PlannerControls
          reorderHandler={this.props.reorderHandler}
          selectedPlanner={selectedPlanner}
        />

        <Grid container justify={'center'} spacing={1}>
          {/*<TimeColumn />*/}
          <Column
            dayOfWeek={'monday'}
            plannerDay={plannerItems.monday}
            color={'#f40407'}
          />
          <Column
            dayOfWeek={'tuesday'}
            plannerDay={plannerItems.tuesday}
            color={'#f5b90f'}
          />
          <Column
            dayOfWeek={'wednesday'}
            plannerDay={plannerItems.wednesday}
            color={'#6ecb3a'}
          />
          <Column
            dayOfWeek={'thursday'}
            plannerDay={plannerItems.thursday}
            color={'#06aceb'}
          />
          <Column
            dayOfWeek={'friday'}
            plannerDay={plannerItems.friday}
            color={'#993cba'}
          />
        </Grid>
      </DragDropContext>
    );
  }
}

export interface LessonPlannerProps extends WithStyles<typeof styles> {
  selectedPlanner: Lesson;
  reorderHandler: (items: LessonItem[], sourceId: string) => void;
  moveHandler: (items: LessonItems) => void;
  loadLessonPlannersHandler: (planners: any) => Lesson[];
}

export default withStyles(styles, { withTheme: true })(LessonPlanner);
