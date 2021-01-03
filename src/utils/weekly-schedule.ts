import { DraggableLocation } from 'react-beautiful-dnd';
import { PlannerMoveResult, PlannerItem } from '../configs/types/WeeklyPlanner';

/**
 * Reorder items in list
 */
export const reorder = (
  list: PlannerItem[],
  startIndex: number,
  endIndex: number
): PlannerItem[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (
  source: PlannerItem[],
  destination: PlannerItem[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): PlannerMoveResult | any => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const getItems = (count: number, offset = 0): PlannerItem[] => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    content: `item ${k + offset}`,
    id: `item-${k + offset}`,
  }));
};
