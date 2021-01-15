import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { Link } from '../configs/types/Link';

export default {
  reducer(
    state: TopicLinksState = ({} as unknown) as TopicLinksState,
    action: AnyAction
  ): TopicLinksState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        break;
      case actions.LOAD_TOPIC_LINKS_LIST:
        newState.links = action.links;
        break;
      case actions.OPEN_DELETE_LINK_DIALOG:
        newState.displayDeleteLinkDialog = true;
        newState.deleteLinkId = action.id;
        newState.deleteLinkTitle = action.title;
        break;
      case actions.CLOSE_DELETE_LINK_DIALOG:
        newState.displayDeleteLinkDialog = false;
        break;
      case actions.OPEN_NEW_LINK_DIALOG:
        newState.displayNewLinkDialog = true;
        break;
      case actions.CLOSE_NEW_LINK_DIALOG:
        newState.displayNewLinkDialog = false;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface TopicLinksState {
  links: Link[];
  deleteLinkId: string;
  deleteLinkTitle: string;
  displayNewLinkDialog: boolean;
  displayDeleteLinkDialog: boolean;
}
