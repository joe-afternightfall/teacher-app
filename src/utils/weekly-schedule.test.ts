import { move, reorder, updateAllItems } from './weekly-schedule';
import { buildLessonItems, buildLessonPlanner } from '../configs/test-utils/test-util';

describe('Weekly Schedule', () => {
  it('should reorder schedule', () => {
    const itemOne = buildLessonItems(1)[0];
    const itemTwo = buildLessonItems(1)[0];

    const plannerItems = reorder([itemOne, itemTwo], 0, 1);

    expect(plannerItems).toEqual([itemTwo, itemOne]);
  });

  it('should move schedule', () => {
    const twoItems = buildLessonItems(2);
    const fourItems = buildLessonItems(4);

    const droppableSource = {
      droppableId: 'firstColumn',
      index: 0,
    };

    const droppableDestination = {
      droppableId: 'secondColumn',
      index: 1,
    };

    const result = move(
      twoItems,
      fourItems,
      droppableSource,
      droppableDestination
    );

    expect(result.firstColumn.length).toEqual(1);
    expect(result.secondColumn.length).toEqual(5);
  });

  it('should update all items', () => {
    const moveResult = {
      tuesday: buildLessonItems(1),
    };

    const result = updateAllItems(moveResult, buildLessonPlanner());

    expect(result.monday.length).toEqual(3);
    expect(result.tuesday.length).toEqual(1);
    expect(result.wednesday.length).toEqual(2);
    expect(result.thursday.length).toEqual(1);
    expect(result.friday.length).toEqual(2);
  });
});
