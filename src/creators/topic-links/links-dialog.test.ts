import actions from '../actions';
import { closeNewLinkDialog, openNewLinkDialog } from './links-dialog';

describe('links dialog actions', () => {
  it('should return CLOSE_NEW_LINK_DIALOG', () => {
    const response = closeNewLinkDialog();

    expect(response).toEqual({
      type: actions.CLOSE_NEW_LINK_DIALOG,
    });
  });

  it('should return OPEN_NEW_LINK_DIALOG', () => {
    const response = openNewLinkDialog();

    expect(response).toEqual({
      type: actions.OPEN_NEW_LINK_DIALOG,
    });
  });
});
