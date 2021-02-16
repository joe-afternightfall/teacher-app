import actions from '../actions';
import { AnyAction } from 'redux';

export const updateBookmarkSubject = (value: string): AnyAction => {
  return {
    type: actions.UPDATE_BOOKMARK_SUBJECT_ID,
    value: value
  }
}

export const updateBookmarkUrl = (value: string): AnyAction => {
  return {
    type: actions.UPDATE_BOOKMARK_URL,
    value: value
  }
}

export const updateBookmarkTitle = (value: string): AnyAction => {
  return {
    type: actions.UPDATE_BOOKMARK_TITLE,
    value: value
  }
}
