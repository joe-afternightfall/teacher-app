import { selectIcon } from './select-icon';
import { v4 as uuidv4 } from 'uuid';
import actions from '../actions';

describe('select icon creator', () => {
  it('should return SELECT_ICON', () => {
    const iconId = uuidv4();
    const response = selectIcon(iconId);

    expect(response).toEqual({
      type: actions.SELECT_ICON,
      iconId: iconId,
    });
  });
});