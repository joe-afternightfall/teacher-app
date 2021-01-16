import { loadTopicLinksList } from './links';
import { v4 as uuidv4 } from 'uuid';
import actions from '../actions';

describe('links creators', () => {
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
  it('should return action', () => {
    const loadedTopics = loadTopicLinksList(links);

    expect(loadedTopics).toEqual({
      type: actions.LOAD_TOPIC_LINKS_LIST,
      links: links,
    });
  });
});
