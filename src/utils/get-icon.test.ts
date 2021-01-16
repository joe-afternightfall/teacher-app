import { getIcon } from './get-icon';
import ColorLensIcon from '@material-ui/icons/ColorLens';

describe('get icon util', () => {
  it('should return icon', () => {
    const icon = getIcon('93efa857-716c-4d5e-bea2-e8c9d975c5d2');

    expect(icon).toEqual(ColorLensIcon);
  });
});
