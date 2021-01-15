import actions from './actions';
import { Link } from '../configs/types/Link';

export const loadLinksList = (links: Link[]) => {
  return {
    type: actions.LOAD_LINK_LIST,
    links: links,
  };
};
