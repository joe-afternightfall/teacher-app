import { DraggableLocation } from 'react-beautiful-dnd';
import { IMoveResult, Item } from '../configs/types/WeeklySchedule';

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

const grid = 8;

export const getItemStyle = (
  draggableStyle: any,
  isDragging: boolean
): Record<string, unknown> => ({
  userSelect: 'none',
  padding: 2 * grid,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

export const getListStyle = (
  isDraggingOver: boolean
): Record<string, unknown> => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 300,
  minHeight: 400,
});
