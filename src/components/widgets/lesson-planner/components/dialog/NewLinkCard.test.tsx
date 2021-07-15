import { render } from '@testing-library/react';
import NewLinkCard from './NewLinkCard';
import userEvent from '@testing-library/user-event';
import { chance } from 'jest-chance';

describe('New Link Card Component', () => {

  it('should call click handler with entered info', () => {
    const randomUrl = chance.string();
    const randomTitle = chance.string();

    const clickHandler = jest.fn();
    const newLinkCard = render(<NewLinkCard clickHandler={clickHandler}/>);

    const urlInput = newLinkCard
      .getByTestId('new-link-url-textfield')
      .querySelector('input');

    if (urlInput !== null) {
      // userEvent.clear(input);
      userEvent.type(urlInput, randomUrl);
    }

    const titleInput = newLinkCard
      .getByTestId('new-link-title-textfield')
      .querySelector('input');

    if (titleInput !== null) {
      // userEvent.clear(input);
      userEvent.type(titleInput, randomTitle);
    }

    newLinkCard.getByTestId('new-link-save-button').click();

    expect(clickHandler).toHaveBeenCalledWith({
      linkTitle: randomTitle,
      linkUrl: randomUrl
    });
  });

});