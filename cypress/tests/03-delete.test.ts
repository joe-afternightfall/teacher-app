export {}

describe('Deleting subject', () => {
  const localBaseUrl = 'http://localhost:3000';

  it('should delete bookmark', () => {
    cy.visit(localBaseUrl);
    cy.findByTestId('bookmarks-nav').click();
    cy.findByText('Editing Test Bookmark').should("exist");
    cy.findByText('Editing Test Bookmark').closest('tr').find('[title="Delete"]').click();
    cy.findByText('Are you sure you want to delete this row?').should('be.visible');
    cy.findByText('check').click();
    cy.contains('Deleted Bookmark').should('be.visible');
    // cy.findAllByText("Jackie Chan").click();
    // cy.findByLabelText("Label text", { timeout: 7000 }).should("exist");
    // cy.get("form").within(() => {
    //   cy.findByText("Button Text").should("exist");
    // });
    // cy.get("form").then((subject) => {
    //   cy.findByText("Button Text", { container: subject }).should("exist");
    // });
  });

  it('should delete subject', () => {
    cy.visit(localBaseUrl);
    cy.get('[data-testid="delete-Editing Test Subject"]').click();
    cy.contains('Are you sure you want to delete Editing Test Subject?').should('be.visible');
    cy.get('[data-testid="app-dialog-confirm-button"]').click();
  });
});
