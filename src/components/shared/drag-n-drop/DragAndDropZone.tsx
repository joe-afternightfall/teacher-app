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
  LessonWeekdays,
  MoveLessonResult,
} from '../../../configs/types/LessonPlanner';
import { LessonItem } from '../../../configs/models/LessonItem';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { LessonPlanner } from '../../../configs/models/LessonPlanner';
import { move, reorder, updateAllItems } from '../../../utils/weekly-planner';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class DragAndDropZone extends Component<DragAndDropZoneProps> {
  render(): JSX.Element {
    const { selectedPlanner } = this.props;

    const getList = (dayOfWeek: string): LessonItem[] => {
      return selectedPlanner.weekdays[dayOfWeek].items;
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
          {this.props.dragAndDropColumns}
        </Grid>
      </DragDropContext>
    );
  }
}

export interface DragAndDropZoneProps extends WithStyles<typeof styles> {
  dragAndDropColumns: JSX.Element;
  selectedPlanner: LessonPlanner;
  moveHandler: (days: LessonWeekdays) => void;
  reorderHandler: (items: LessonItem[], sourceId: string) => void;
}

export default withStyles(styles, { withTheme: true })(DragAndDropZone);
