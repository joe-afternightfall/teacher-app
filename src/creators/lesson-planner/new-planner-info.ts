import actions from '../actions';

export const updateWeekNumber = (weekNumber: string) => {
  return {
    type: actions.UPDATE_WEEK_NUMBER,
    weekNumber: weekNumber,
  };
};

export const updatePlannerStartDate = (date: string) => {
  return {
    type: actions.UPDATE_PLANNER_START_DATE,
    startDate: date,
  }
}

export const updatePlannerEndDate = (date: string) => {
  return {
    type: actions.UPDATE_PLANNER_END_DATE,
    endDate: date,
  }
}
