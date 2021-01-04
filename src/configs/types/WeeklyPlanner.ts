export interface PlannerItem {
  id: string;
  content: string;
}

export interface PlannerNote {
  id: string;
  content: string;
}

export interface PlannerMoveResult {
  monday: PlannerItem[];
  tuesday: PlannerItem[];
  wednesday: PlannerItem[];
  thursday: PlannerItem[];
  friday: PlannerItem[];
}

export interface PlannerDay {
  date: string;
  items: PlannerItem[];
}

export interface MovePlannerResult {
  [key: string]: PlannerItem[];
}

export interface Planner {
  id: string;
  title: string;
  items: {
    [key: string]: PlannerDay;
  };
  notes: PlannerNote[];
}

export interface PlannerItems {
  monday: PlannerItem[];
  tuesday: PlannerItem[];
  wednesday: PlannerItem[];
  thursday: PlannerItem[];
  friday: PlannerItem[];
}
