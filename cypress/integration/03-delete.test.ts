/// <reference types="Cypress" />

describe('Deleting subject', () => {
  const localBaseUrl = 'http://localhost:3000';

  it('should delete bookmark', () => {
    cy.visit(localBaseUrl);
    cy.get('[data-testid="bookmarks-nav"]').click();

    cy.contains('Are you sure you want to delete Editing Test Subject?');
    cy.get('[data-testid="app-dialog-confirm-button"]').click();
  });

  it('should delete subject', () => {
    cy.visit(localBaseUrl);
    cy.get('[data-testid="delete-Editing Test Subject"]').click();
    cy.contains('Are you sure you want to delete Editing Test Subject?');
    cy.get('[data-testid="app-dialog-confirm-button"]').click();
  });
});
