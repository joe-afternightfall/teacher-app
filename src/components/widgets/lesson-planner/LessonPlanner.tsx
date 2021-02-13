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
  Weekday,
  LessonWeekdays,
  MoveLessonResult,
} from '../../../configs/types/LessonPlanner';
import { Subject } from '../../../configs/models/Subject';
import { LessonItem } from '../../../configs/models/LessonItem';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { LessonPlanner } from '../../../configs/models/LessonPlanner';
import DragAndDropColumn from '../../shared/drag-n-drop/DragAndDropColumn';
import { move, reorder, updateAllItems } from '../../../utils/weekly-planner';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class LessonPlannerComp extends Component<LessonPlannerProps> {
  render(): JSX.Element {
    const { selectedPlanner, subjectList } = this.props;

    const plannerItems: { [key: string]: Weekday } = selectedPlanner.weekdays;

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

        const updatedDays: LessonWeekdays = updateAllItems(
          resultFromMove,
          selectedPlanner
        );

        this.props.moveHandler(updatedDays);
      }
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container justify={'center'} spacing={1}>
          {/*<TimeColumn />*/}
          <DragAndDropColumn
            subjectList={subjectList}
            dayOfWeek={'monday'}
            plannerDay={plannerItems && plannerItems.monday}
            color={'#E43F78'}
          />
          <DragAndDropColumn
            subjectList={subjectList}
            dayOfWeek={'tuesday'}
            plannerDay={plannerItems && plannerItems.tuesday}
            // color={'#f2b645'}
            color={'#EF8C0A'}
          />
          <DragAndDropColumn
            subjectList={subjectList}
            dayOfWeek={'wednesday'}
            plannerDay={plannerItems && plannerItems.wednesday}
            color={'#77C74B'}
          />
          <DragAndDropColumn
            subjectList={subjectList}
            dayOfWeek={'thursday'}
            plannerDay={plannerItems && plannerItems.thursday}
            color={'#2C9DF0'}
          />
          <DragAndDropColumn
            subjectList={subjectList}
            dayOfWeek={'friday'}
            plannerDay={plannerItems && plannerItems.friday}
            color={'#725FE7'}
          />
        </Grid>
      </DragDropContext>
    );
  }
}

export interface LessonPlannerProps extends WithStyles<typeof styles> {
  selectedPlanner: LessonPlanner;
  reorderHandler: (items: LessonItem[], sourceId: string) => void;
  moveHandler: (days: LessonWeekdays) => void;
  subjectList: Subject[];
}

export default withStyles(styles, { withTheme: true })(LessonPlannerComp);
