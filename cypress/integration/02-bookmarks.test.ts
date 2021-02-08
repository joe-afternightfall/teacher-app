/// <reference types="Cypress" />

describe('Bookmarks Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(localBaseUrl);
  });

  it('should create a new bookmark', () => {
    cy.get('[data-testid="bookmarks-nav"]').click();
    cy.get('[title="Add Bookmark"]').click();
    cy.get('[data-testid="bookmark-title"]').type('Test Bookmark');
    cy.get('[data-testid="subject-dropdown-list"]').click();
    cy.get('[data-testid="subject-menu-Editing Test Subject"]').click();
    cy.get('[data-testid="bookmark-url"]').type('www.google.com');
    cy.get('[data-testid="save-bookmark-button"]').click();
    cy.contains('Bookmark Saved');
  });
});
