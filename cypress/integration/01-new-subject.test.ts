// import React from 'react';
/// <reference types="Cypress" />

describe('New Subject Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  it('should create new test subject', () => {
    // cy.open()
    cy.visit(localBaseUrl);
    cy.get('[data-testid="add-new-subject"]').click();
    cy.get('[data-testid="subject-name"]').type('Test Subject');
    cy.get('[data-testid="subject-builder-save-button"]').should('be.disabled');
    cy.get('[data-testid="Object"]').click();
    cy.get('[data-testid="Deep Orange"]').click();
    cy.get('[data-testid="subject-builder-save-button"]').should('be.enabled');
    cy.get('[data-testid="subject-builder-save-button"]').click();

    cy.get('[data-testid="edit-Test Subject"]').click();
    // cy.get('[title="Add Bookmark"]').click();
    // cy.get('[data-testid="bookmark-title"]').type('My Test Bookmark');
    // cy.get('[data-testid="subject-dropdown"]').click();
  })
})