import actions from '../../creators/actions';
import { getStore } from '../../configs/test-utils/mock-redux';
import { LessonPlanner } from '../../configs/models/LessonPlanner';
import { LessonPlannerDAO } from '../../configs/models/LessonPlannerDAO';
import { updateLessonPlanners, updateTemplateBuilder } from './lesson-planner';
import { getLessonPlanners } from '../../services/lesson-planner/get-planners';
import { buildLessonPlannerDAOList } from '../../configs/test-utils/test-util';
import { getTemplateBuilder } from '../../services/template-builder/get-template-builder';

jest.mock('../../services/lesson-planner/get-planners');
jest.mock('../../services/template-builder/get-template-builder');

const getLessonPlannersMock = getLessonPlanners as jest.Mock;
const getTemplateBuilderMock = getTemplateBuilder as jest.Mock;

describe('lesson planner util method', () => {
  it('should dispatch load template', async () => {
    const builtList = buildLessonPlannerDAOList(1);
    const expected = buildExpected(builtList);

    getTemplateBuilderMock.mockResolvedValue(builtList);

    const store = getStore({});

    await updateTemplateBuilder(store);

    expect(store.getActions()).toStrictEqual([
      {
        type: actions.LOAD_TEMPLATE_BUILDER,
        template: expected[0],
      },
    ]);
  });

  it('should dispatch load lesson planners', async () => {
    const builtList = buildLessonPlannerDAOList(1);
    const expected = buildExpected(builtList);

    getLessonPlannersMock.mockResolvedValue(builtList);

    const store = getStore({});

    await updateLessonPlanners(store);

    expect(store.getActions()).toStrictEqual([
      {
        type: actions.LOAD_LESSON_PLANNERS,
        lessonPlanners: expected,
      },
    ]);
  });

  it('should dispatch null when no lesson planner returned', async () => {
    getLessonPlannersMock.mockResolvedValue(undefined);
    const store = getStore({});

    await updateLessonPlanners(store);

    expect(store.getActions()).toStrictEqual([
      {
        type: actions.LOAD_LESSON_PLANNERS,
        lessonPlanners: null,
      },
    ]);
  });

  it('should dispatch null when no template builder returned', async () => {
    getTemplateBuilderMock.mockResolvedValue(undefined);
    const store = getStore({});

    await updateTemplateBuilder(store);

    expect(store.getActions()).toStrictEqual([
      {
        type: actions.LOAD_TEMPLATE_BUILDER,
        template: null,
      },
    ]);
  });

  function buildExpected(list: LessonPlannerDAO[]): LessonPlanner[] {
    return list.map((planner, index) => {
      return {
        firebaseId: index.toString(),
        updatedAt: planner.updatedAt,
        id: planner.id,
        title: planner.title,
        weekNumber: planner.weekNumber,
        weekdays: {
          monday: planner.weekdays.monday,
          tuesday: planner.weekdays.tuesday,
          wednesday: planner.weekdays.wednesday,
          thursday: planner.weekdays.thursday,
          friday: planner.weekdays.friday,
        },
        notes: planner.notes,
      };
    });
  }
});
