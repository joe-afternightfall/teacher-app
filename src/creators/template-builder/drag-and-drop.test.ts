import { moveTemplateItem, reorderTemplateBuilder } from './drag-and-drop';
import { buildLessonItems } from '../../configs/test-utils/test-util';
import actions from '../actions';

describe('drag and drop creator', () => {
  it('should return REORDER_TEMPLATE_BUILDER', () => {
    const items = buildLessonItems(4);
    const response = reorderTemplateBuilder(items, 'friday');

    expect(response).toEqual({
      type: actions.REORDER_TEMPLATE_BUILDER,
      items: items,
      dayOfWeek: 'friday',
    });
  });

  it('should return MOVE_TEMPLATE_ITEMS', () => {
    const mondayItems = buildLessonItems(4);
    const tuesdayItems = buildLessonItems(2);
    const days = {
      monday: mondayItems,
      tuesday: tuesdayItems,
      wednesday: tuesdayItems,
      thursday: tuesdayItems,
      friday: tuesdayItems
    }
    const response = moveTemplateItem(days);

    expect(response).toEqual({
      type: actions.MOVE_TEMPLATE_ITEMS,
      days: days,
    });
  });
});
