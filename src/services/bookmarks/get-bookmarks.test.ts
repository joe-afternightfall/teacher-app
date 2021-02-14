import { getBookmarksList } from './get-bookmarks';
import { buildBookmarkList } from '../../configs/test-utils/test-util';

const bookmarks = buildBookmarkList(3);

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
            val: jest.fn(() => bookmarks),
          })
        )
      ),
    }),
  },
}));

describe('get bookmarks service', () => {
  it('should return bookmarks snapshot', async () => {
    const dataSnapshot = await getBookmarksList();

    expect(dataSnapshot).toStrictEqual(bookmarks);
  });
});
