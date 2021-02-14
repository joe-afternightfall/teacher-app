import { getLessonPlanners } from './get-planners';
import { buildLessonPlannerDAOList } from '../../configs/test-utils/test-util';

const planners = buildLessonPlannerDAOList(3);

jest.mock('firebase', () => ({
  __esModule: true,
  default: {
    apps: [],
    initializeApp: jest.fn(),
    database: jest.fn().mockReturnValue({
      ref: jest.fn().mockReturnThis(),
      once: jest.fn().mockReturnValue(
        new Promise((resolve) =>
          resolve({
            val: jest.fn(() => planners),
          })
        )
      ),
    }),
  },
}));

describe('get planner service', () => {
  it('should return planner', async () => {
    const response = await getLessonPlanners();

    expect(response).toStrictEqual(planners);
  });
});
