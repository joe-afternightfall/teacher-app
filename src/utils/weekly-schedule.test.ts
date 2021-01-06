import { move, reorder, updateAllItems } from './weekly-schedule';

describe('Weekly Schedule', () => {
  it('should reorder schedule', () => {
    const itemOne = {
      id: 'test-id-one',
      content: 'test-content-one',
    };

    const itemTwo = {
      id: 'test-id-two',
      content: 'test-content-two',
    };

    const plannerItems = reorder([itemOne, itemTwo], 0, 1);

    expect(plannerItems).toEqual([itemTwo, itemOne]);
  });

  it('should move schedule', () => {
    const twoItems = buildPlannerItem(2);
    const fourItems = buildPlannerItem(4);

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
      tuesday: buildPlannerItem(1),
    };

    const planner = {
      createdAt: '123456789',
      id: 'planner-id',
      title: 'planner-title',
      items: {
        monday: {
          date: '01/01/2021',
          items: buildPlannerItem(3),
        },
        wednesday: {
          date: '01/03/2021',
          items: buildPlannerItem(2),
        },
        thursday: {
          date: '01/04/2021',
          items: buildPlannerItem(1),
        },
        friday: {
          date: '01/05/2021',
          items: buildPlannerItem(2),
        },
      },
      notes: [
        {
          id: 'note-id-one',
          content: 'note-content-one',
        },
        {
          id: 'note-id-two',
          content: 'note-content-two',
        },
      ],
    };

    const result = updateAllItems(moveResult, planner);

    expect(result.monday.length).toEqual(3);
    expect(result.tuesday.length).toEqual(1);
    expect(result.wednesday.length).toEqual(2);
    expect(result.thursday.length).toEqual(1);
    expect(result.friday.length).toEqual(2);
  });
});

function buildPlannerItem(items: number) {
  let index = 0;
  const builtList = [];

  while (index < items) {
    index += 1;

    builtList.push({
      id: `test-id-${index}`,
      content: `test-content-${index}`,
    });
  }

  return builtList;
}
