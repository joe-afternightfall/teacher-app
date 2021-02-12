import actions from '../actions';
import { AnyAction } from 'redux';

export const addPlannerFromTemplate = (): AnyAction => {
  return {
    type: actions.ADD_PLANNER_FROM_TEMPLATE,
  };
};

export const updateWeekNumber = (weekNumber: string): AnyAction => {
  return {
    type: actions.UPDATE_WEEK_NUMBER,
    weekNumber: weekNumber,
  };
};

export const updatePlannerTitle = (plannerTitle: string): AnyAction => {
  return {
    type: actions.UPDATE_PLANNER_TITLE,
    plannerTitle: plannerTitle,
  };
};

export const updatePlannerStartDate = (date: string): AnyAction => {
  return {
    type: actions.UPDATE_PLANNER_START_DATE,
    startDate: date,
  };
};

export const updatePlannerEndDate = (date: string): AnyAction => {
  return {
    type: actions.UPDATE_PLANNER_END_DATE,
    endDate: date,
  };
};

export const clearNewPlannerInfo = (): AnyAction => {
  return {
    type: actions.CLEAR_NEW_PLANNER_INFO,
  };
};
