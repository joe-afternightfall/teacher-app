export {}

describe('Bookmarks Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(localBaseUrl);
  });

  it('should create a new bookmark', () => {
    cy.findByTestId('bookmarks-nav').click();
    cy.get('[title="Add Bookmark"]').click();
    cy.findByTestId('bookmark-title').type('Test Bookmark');
    cy.findByTestId('subject-dropdown-list').click();
    cy.findByTestId('subject-menu-Editing Test Subject').click();
    cy.findByTestId('bookmark-url').type('www.google.com');
    cy.findByTestId('app-dialog-confirm-button').click();
    cy.contains('Bookmark Saved').should('be.visible');
  });

  it('should allow user to edit bookmark', () => {
    cy.findByTestId('bookmarks-nav').click();
    cy.findByText("Test Bookmark").should('exist');
    cy.findByText('Test Bookmark').closest('tr').find('[title="Edit"]').click();
    cy.findByPlaceholderText('Title').clear().type('Editing Test Bookmark');
    cy.findByTestId('edit-url-text-field').find('input').clear().type('www.testing.com');
    cy.findByText('check').click();
    cy.contains('Updated Editing Test Bookmark').should('be.visible');
    // cy.get("form").within(() => {
    //   cy.findByText("Button Text").should("exist");
    // });
    // cy.get("form").then((subject) => {
    //   cy.findByText("Button Text", { container: subject }).should("exist");
    // });
  });
});
