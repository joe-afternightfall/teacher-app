export interface Item {
  id: string;
  content: string;
}

export interface IMoveResult {
  droppable: Item[];
  droppable2: Item[];
  monday: Item[];
  tuesday: Item[];
  wednesday: Item[];
  thursday: Item[];
  friday: Item[];
}

export interface WeeklyScheduleState {
  [key: string]: Item[];
  selected: Item[];
}
