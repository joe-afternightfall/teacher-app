import actions from '../actions';
import { Link } from '../../configs/types/Link';

export const loadTopicLinksList = (links: Link[]) => {
  return {
    type: actions.LOAD_TOPIC_LINKS_LIST,
    links: links,
  };
};
