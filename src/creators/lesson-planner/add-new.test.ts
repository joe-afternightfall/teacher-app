import {
  updateWeekNumber,
  updatePlannerTitle,
  clearNewPlannerInfo,
  updatePlannerEndDate,
  addPlannerFromTemplate,
  updatePlannerStartDate,
} from './add-new';
import actions from '../actions';

describe('add new creator', () => {
  it('should return ADD_PLANNER_FROM_TEMPLATE', () => {
    const response = addPlannerFromTemplate();

    expect(response).toEqual({
      type: actions.ADD_PLANNER_FROM_TEMPLATE,
    });
  });

  it('should return UPDATE_WEEK_NUMBER', () => {
    const response = updateWeekNumber('13');

    expect(response).toEqual({
      type: actions.UPDATE_WEEK_NUMBER,
      weekNumber: '13',
    });
  });

  it('should return UPDATE_PLANNER_TITLE', () => {
    const response = updatePlannerTitle('planner-title');

    expect(response).toEqual({
      type: actions.UPDATE_PLANNER_TITLE,
      plannerTitle: 'planner-title',
    });
  });

  it('should return UPDATE_PLANNER_START_DATE', () => {
    const response = updatePlannerStartDate('02/13/2020');

    expect(response).toEqual({
      type: actions.UPDATE_PLANNER_START_DATE,
      startDate: '02/13/2020',
    });
  });

  it('should return UPDATE_PLANNER_END_DATE', () => {
    const response = updatePlannerEndDate('12/24/2021');

    expect(response).toEqual({
      type: actions.UPDATE_PLANNER_END_DATE,
      endDate: '12/24/2021',
    });
  });

  it('should return CLEAR_NEW_PLANNER_INFO', () => {
    const response = clearNewPlannerInfo();

    expect(response).toEqual({
      type: actions.CLEAR_NEW_PLANNER_INFO,
    });
  });
});
