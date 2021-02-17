import { updateWeekdays } from './update-weekdays';
import {
  buildLessonItems,
  buildLessonPlanner,
} from '../configs/test-utils/test-util';

describe('updating weekdays util', () => {
  it('should return updated lesson planner', () => {
    const builtPlanner = buildLessonPlanner();

    const days = {
      monday: buildLessonItems(4),
      tuesday: buildLessonItems(4),
      wednesday: buildLessonItems(3),
      thursday: buildLessonItems(2),
      friday: buildLessonItems(4),
    };

    const updatedPlanner = updateWeekdays(builtPlanner, days);

    expect(updatedPlanner.weekdays.monday.items).toEqual(days.monday);
    expect(updatedPlanner.weekdays.tuesday.items).toEqual(days.tuesday);
    expect(updatedPlanner.weekdays.wednesday.items).toEqual(days.wednesday);
    expect(updatedPlanner.weekdays.thursday.items).toEqual(days.thursday);
    expect(updatedPlanner.weekdays.friday.items).toEqual(days.friday);
  });
});
