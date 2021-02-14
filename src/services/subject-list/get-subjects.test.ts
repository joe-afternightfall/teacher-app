import { getSubjects } from './get-subjects';
import { buildSubjectDAOList } from '../../configs/test-utils/test-util';
const subjects = buildSubjectDAOList(4);

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
            val: jest.fn(() => subjects),
          })
        )
      ),
    }),
  },
}));

describe('get subjects service', () => {
  it('should return subject list', async () => {
    const response = await getSubjects();

    expect(response).toEqual(subjects);
  });
});
