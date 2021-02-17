import bookmarks from './bookmarks';
import { v4 as uuidv4 } from 'uuid';
import actions from '../creators/actions';
import { buildBookmarkList } from '../configs/test-utils/test-util';
import { getStore } from '../configs/test-utils/mock-redux';

describe('bookmarks reducer', () => {
  const bookmarksList = buildBookmarkList(3);

  it('should return bookmarks', () => {
    const response = bookmarks.reducer(undefined, {
      type: actions.LOAD_BOOKMARKS_LIST,
      bookmarks: bookmarksList,
    });

    expect(response).toEqual({
      bookmarks: bookmarksList,
    });
  });

  it('should return OPEN_NEW_BOOKMARK_DIALOG action', () => {
    const response = bookmarks.reducer(undefined, {
      type: actions.OPEN_NEW_BOOKMARK_DIALOG,
    });

    expect(response).toEqual({
      displayNewBookmarkDialog: true,
    });
  });

  it('should return CLOSE_NEW_BOOKMARK_DIALOG action', () => {
    const response = bookmarks.reducer(undefined, {
      type: actions.CLOSE_NEW_BOOKMARK_DIALOG,
    });

    expect(response).toEqual({
      displayNewBookmarkDialog: false,
    });
  });

  it('should return UPDATE_BOOKMARK_URL action', () => {
    const url = uuidv4();
    const response = bookmarks.reducer(undefined, {
      type: actions.UPDATE_BOOKMARK_URL,
      value: url
    });

    expect(response).toEqual({
      url: url,
    });
  });

  it('should return UPDATE_BOOKMARK_TITLE action', () => {
    const title = uuidv4();
    const response = bookmarks.reducer(undefined, {
      type: actions.UPDATE_BOOKMARK_TITLE,
      value: title
    });

    expect(response).toEqual({
      title: title,
    });
  });

  it('should return UPDATE_BOOKMARK_SUBJECT_ID action', () => {
    const subjectId = uuidv4();
    const response = bookmarks.reducer(undefined, {
      type: actions.UPDATE_BOOKMARK_SUBJECT_ID,
      value: subjectId
    });

    expect(response).toEqual({
      subjectId: subjectId,
    });
  });

  it('should return CLEAR_BOOKMARK_DIALOG action', () => {
    const subjectId = uuidv4();
    const response = bookmarks.reducer(undefined, {
      type: actions.CLEAR_BOOKMARK_DIALOG,
    });

    expect(response).toEqual({
      subjectId: '',
      title: '',
      url: ''
    });
  });

  it('should return object', () => {
    let appState = getStore({}).getState();
    const response = bookmarks.reducer(appState, {
      type: 'TESTING',
    });

    expect(response).toEqual(appState);
  });

  it('should return default state', () => {
    const response = bookmarks.reducer(undefined, {
      type: 'TESTING',
    });

    expect(response).toEqual({});
  });
});
