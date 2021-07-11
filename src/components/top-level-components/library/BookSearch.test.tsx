import React from 'react';
import { chance } from 'jest-chance';
import BookSearch from './BookSearch';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';
import userEvent from '@testing-library/user-event';
import { searchISBN } from '../../../services/library/isbn-search';

jest.mock('../../../services/library/isbn-search');

const searchISBNMock = searchISBN as jest.Mock;

describe('Book Search Component', () => {
  it('should have a disabled button if textfield is empty', () => {
    const bookSearch = renderWithRedux(<BookSearch />, getStore({}));

    expect(bookSearch.getByTestId('isbn-search-button')).toBeDisabled();
  });

  it('should dispatch action when clicked', () => {
    const dispatchMock = jest.fn();

    const store = getStore({}, dispatchMock);

    const bookSearch = renderWithRedux(<BookSearch />, store);

    const input = bookSearch
      .getByTestId('isbn-search-textfield')
      .querySelector('input');
    const randomText = chance.string();

    if (input !== null) {
      // userEvent.clear(input);
      userEvent.type(input, randomText);
    }

    const searchButton = bookSearch.getByTestId('isbn-search-button');
    expect(searchButton).not.toBeDisabled();

    searchButton.click();

    expect(searchISBNMock).toHaveBeenCalledTimes(1);
    expect(searchISBNMock).toHaveBeenCalledWith(randomText);
  });
});
