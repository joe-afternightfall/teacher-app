import { BookmarkDAO } from './BookmarkDAO';

export class Bookmark extends BookmarkDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    bookmarkUrl: string,
    bookmarkTitle: string,
    subjectId: string,
    plannerItemIds: string[]
  ) {
    super(id, bookmarkUrl, bookmarkTitle, subjectId, plannerItemIds);

    this.firebaseId = firebaseId;
  }
}
