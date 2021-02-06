import {
  MoveLessonResult,
  LessonWeekdays,
} from '../configs/types/LessonPlanner';
import { DraggableLocation } from 'react-beautiful-dnd';
import { LessonItem } from '../configs/models/LessonItem';
import { LessonPlanner } from '../configs/models/LessonPlanner';

/**
 * Reorder items in list
 */
export const reorder = (
  list: LessonItem[],
  startIndex: number,
  endIndex: number
): LessonItem[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (
  source: LessonItem[],
  destination: LessonItem[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): MoveLessonResult[] | any => {
  const sourceClone = [...source];
  const destClone = destination === undefined ? [] : [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const updateAllItems = (
  resultFromMove: MoveLessonResult,
  planner: LessonPlanner
): LessonWeekdays => {
  return {
    monday: resultFromMove.monday
      ? resultFromMove.monday
      : planner.weekdays.monday.items,
    tuesday: resultFromMove.tuesday
      ? resultFromMove.tuesday
      : planner.weekdays.tuesday.items,
    wednesday: resultFromMove.wednesday
      ? resultFromMove.wednesday
      : planner.weekdays.wednesday.items,
    thursday: resultFromMove.thursday
      ? resultFromMove.thursday
      : planner.weekdays.thursday.items,
    friday: resultFromMove.friday
      ? resultFromMove.friday
      : planner.weekdays.friday.items,
  };
};
