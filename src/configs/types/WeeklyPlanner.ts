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

export interface WeeklyPlannerState {
  [key: string]: PlannerItem[];
}

export interface WeeklyPlanner {
  id: string;
  title: string;
  items: {
    monday: PlannerDay;
    tuesday: PlannerDay;
    wednesday: PlannerDay;
    thursday: PlannerDay;
    friday: PlannerDay;
  };
  notes: PlannerNote[];
}
