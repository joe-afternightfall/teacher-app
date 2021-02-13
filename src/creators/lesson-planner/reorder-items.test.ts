import actions from '../actions';
import { reorderPlannerItems } from './reorder-items';
import { buildLessonItems } from '../../configs/test-utils/test-util';

describe('reorder items creator', () => {
  it('should return REORDER_LESSON_PLANNER action', () => {
    const items = buildLessonItems(3);
    const action = reorderPlannerItems(items, 'wednesday');

    expect(action).toEqual({
      type: actions.REORDER_LESSON_PLANNER,
      items: items,
      dayOfWeek: 'wednesday'
    });
  });
});
