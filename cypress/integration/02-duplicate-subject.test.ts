// import React from 'react';
/// <reference types="Cypress" />

describe('Duplicate Subject Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  it('block user from saving when duplicate exists', () => {
    // cy.open()
    cy.visit(localBaseUrl);
    cy.get('[data-testid="add-new-subject"]').click();
    cy.get('[data-testid="subject-name"]').type('Test Subject');
    cy.get('[data-testid="subject-builder-save-button"]').should('be.disabled');

    // cy.get('[data-testid="Object"]').click();
    cy.get('[data-testid="Deep Orange"]').should('be.disabled');

    // cy.get('[data-testid="edit-Test Subject"]').click();
    // cy.get('[title="Add Bookmark"]').click();
    // cy.get('[data-testid="bookmark-title"]').type('My Test Bookmark');
    // cy.get('[data-testid="subject-dropdown"]').click();
  })
})