import React from 'react';
import BookInfo from './BookInfo';
import { render } from '@testing-library/react';
import { chance, getChance } from 'jest-chance';

describe('Book Info Component', () => {
  it('should render 2 text fields', () => {
    const title = chance.string();
    const author = chance.string();

    const info = {
      firebaseId: chance.string(),
      id: chance.string(),
      title: title,
      author: author,
      genre: chance.string(),
      gradeLevel: chance.integer(),
      pages: chance.integer(),
      isbn: chance.string(),
    };

    const bookInfo = render(
      <BookInfo
        info={info}
        fieldsToRender={['title', 'author']}
        blurHandler={jest.fn()}
        changeHandler={jest.fn()}
      />
    );

    const titleInput = bookInfo.getByDisplayValue(title) as HTMLInputElement;
    const authorInput = bookInfo.getByDisplayValue(author) as HTMLInputElement;
    // const input = bookInfo.getByTestId('book-title') as HTMLInputElement;

    expect(titleInput.value).toBe(title);
    expect(authorInput.value).toBe(author);
    expect(bookInfo.container.children.length).toEqual(2);
  });
});
