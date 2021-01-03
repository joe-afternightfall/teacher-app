export interface PlannerItem {
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

export interface WeeklyPlannerState {
  [key: string]: PlannerItem[];
}
