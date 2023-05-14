/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    searchFor(searchTerm: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add("searchFor", (searchTerm: string) => {
  cy.get('input[type="text"]').type(searchTerm);
  cy.get("button").contains("Search").click();
});
