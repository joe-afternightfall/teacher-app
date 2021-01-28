export class BookmarkDAO {
  id: string;
  bookmarkUrl: string;
  bookmarkTitle: string;
  subjectId: string;
  plannerItemIds: string[];

  constructor(
    id: string,
    bookmarkUrl: string,
    bookmarkTitle: string,
    subjectId: string,
    plannerItemIds: string[]
  ) {
    this.id = id;
    this.bookmarkUrl = bookmarkUrl;
    this.bookmarkTitle = bookmarkTitle;
    this.subjectId = subjectId;
    this.plannerItemIds = plannerItemIds;
  }
}
