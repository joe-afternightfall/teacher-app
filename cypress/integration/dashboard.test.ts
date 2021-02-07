// import React from 'react';
/// <reference types="Cypress" />

describe('My First Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  // Bookmark
  // create new
  // edit existing
  // delete

  it('bookmark', () => {
    // cy.open()
    cy.visit(localBaseUrl);
    cy.get('[data-testid="bookmarks-nav"]').click();
    cy.get('[title="Add Bookmark"]').click();
    cy.get('[data-testid="bookmark-title"]').type('My Test Bookmark');
    cy.get('[data-testid="subject-dropdown"]').click();
  })
})