import actions from '../actions';
import { movePlannerItems } from './move-items';
import { buildLessonItems } from '../../configs/test-utils/test-util';

describe('move items creator', () => {
  it('should return action', () => {
    const items = buildLessonItems(3);
    const planner = {
      monday: items,
      tuesday: items,
      wednesday: items,
      thursday: items,
      friday: items,
    };

    const action = movePlannerItems(planner, true);

    expect(action).toEqual({
      type: actions.MOVE_PLANNER_ITEMS,
      days: planner,
      isTemplate: true,
    });
  });
});
