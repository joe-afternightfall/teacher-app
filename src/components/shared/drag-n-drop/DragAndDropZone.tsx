import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import {
  LessonWeekdays,
  MoveLessonResult,
} from '../../../configs/types/LessonPlanner';
import { LessonItem } from '../../../configs/models/LessonItem';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { LessonPlanner } from '../../../configs/models/LessonPlanner';
import { move, reorder, updateAllItems } from '../../../utils/weekly-planner';
import { templateBuilderChanged } from '../../../creators/template-builder/builder';

const DragAndDropZone = (props: DragAndDropZoneProps): JSX.Element => {
  const { selectedPlanner } = props;

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
      const reorderedItems: LessonItem[] = reorder(
        getList(dayOfWeek),
        source.index,
        destination.index
      );

      props.dispatchReorder(reorderedItems, dayOfWeek);
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

      props.dispatchMove(updatedDays);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container justify={'center'} spacing={1}>
        {props.dragAndDropColumns}
      </Grid>
    </DragDropContext>
  );
};

export interface DragAndDropZoneProps {
  dragAndDropColumns: JSX.Element;
  selectedPlanner: LessonPlanner;
  moveHandler: (days: LessonWeekdays) => void;
  dispatchMove: (updatedDays: LessonWeekdays) => void;
  reorderHandler: (items: LessonItem[], dayOfWeek: string) => void;
  dispatchReorder: (reorderedItems: LessonItem[], dayOfWeek: string) => void;
}

const mapStateToProps = (): DragAndDropZoneProps => {
  return ({} as unknown) as DragAndDropZoneProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any
): DragAndDropZoneProps =>
  (({
    dispatchMove: (updatedDays: LessonWeekdays): void => {
      dispatch(ownProps.moveHandler(updatedDays));
      dispatch(templateBuilderChanged());
    },
    dispatchReorder: (items: LessonItem[], dayOfWeek: string): void => {
      dispatch(ownProps.reorderHandler(items, dayOfWeek));
      dispatch(templateBuilderChanged());
    },
  } as unknown) as DragAndDropZoneProps);

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDropZone);
