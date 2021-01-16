import topicLinks from './topic-links';
import actions from '../creators/actions';
import { v4 as uuidv4 } from 'uuid';

describe('topic links reducer', () => {
  const links = [
    {
      firebaseId: uuidv4(),
      id: uuidv4(),
      linkUrl: uuidv4(),
      linkTitle: uuidv4(),
      subjectId: uuidv4(),
      plannerItemIds: [uuidv4()],
    },
  ];

  it('should return links', () => {
    const response = topicLinks.reducer(undefined, {
      type: actions.LOAD_TOPIC_LINKS_LIST,
      links: links,
    });

    expect(response).toEqual({
      links: links,
    });
  });

  it('should return OPEN_NEW_LINK_DIALOG action', () => {
    const response = topicLinks.reducer(undefined, {
      type: actions.OPEN_NEW_LINK_DIALOG,
    });

    expect(response).toEqual({
      displayNewLinkDialog: true,
    });
  });

  it('should return CLOSE_NEW_LINK_DIALOG action', () => {
    const response = topicLinks.reducer(undefined, {
      type: actions.CLOSE_NEW_LINK_DIALOG,
    });

    expect(response).toEqual({
      displayNewLinkDialog: false,
    });
  });

  it('should return default state', () => {
    const response = topicLinks.reducer(undefined, {
      type: 'TESTING',
    });

    expect(response).toEqual({});
  });
});
