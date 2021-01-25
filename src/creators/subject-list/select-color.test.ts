import { v4 as uuidv4 } from 'uuid';
import { selectColor } from './select-color';
import actions from '../actions';

describe('select color creator', () => {
  it('should return SELECT_COLOR action', () => {
    const color = {
      id: uuidv4(),
      name: uuidv4(),
      primaryColor: uuidv4(),
      secondaryColor: uuidv4(),
    };

    const action = selectColor(color);

    expect(action).toEqual({
      type: actions.SELECT_COLOR,
      selectedColor: color,
    });
  });
});
