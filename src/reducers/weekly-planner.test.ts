import actions from '../creators/actions';
import weeklyPlanner from './weekly-planner';
import { subjectList, weeklyPlanners } from '../configs/dummy-data';

describe('Weekly Planner State', () => {
  it('should return planners and subject list', () => {
    const state = weeklyPlanner.reducer(undefined, {
      type: actions.INITIALIZE,
      weeklyPlanners: weeklyPlanners,
      subjectList: subjectList,
    });

    expect(state.weeklyPlanners).toBe(weeklyPlanners);
    expect(state.subjectList).toBe(subjectList);
  });

  it('should load weekly planners', () => {
    const state = weeklyPlanner.reducer(undefined, {
      type: actions.LOAD_WEEKLY_PLANNERS,
      weeklyPlanners: weeklyPlanners,
    });

    expect(state.weeklyPlanners).toBe(weeklyPlanners);
    expect(state.selectedPlannerId).toBe('17');
  });
});
