import { buildLessonPlannerDAOList } from '../../configs/test-utils/test-util';
import { getTemplateBuilder } from './get-template-builder';

const planner = buildLessonPlannerDAOList(1);

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
            val: jest.fn(() => planner[0]),
          })
        )
      ),
    }),
  },
}));

describe('get template builder service', () => {
  it('should return template', async () => {
    const response = await getTemplateBuilder();

    expect(response).toEqual(planner[0]);
  });
});
