import { Item } from '../configs/types/Item';
import { DraggableLocation } from 'react-beautiful-dnd';
import { IMoveResult } from '../configs/types/IMoveResult';

/**
 * Reorder items in list
 */
export const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (
  source: Item[],
  destination: Item[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): IMoveResult | any => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const getItems = (count: number, offset = 0): Item[] => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    content: `item ${k + offset}`,
    id: `item-${k + offset}`,
  }));
};
