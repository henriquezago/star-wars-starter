describe("Search Movies", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/api/movies?search=jedi", {
      fixture: "search-jedi.json",
    });

    cy.intercept("GET", "http://localhost:3000/api/movie?id=1", {
      fixture: "return-of-the-jedi.json",
    });

    cy.visit("http://localhost:3000/");
  });

  it("should search for Return of the Jedi", () => {
    cy.get('input[type="radio"]').check("movies");
    cy.searchFor("jedi");

    cy.get("span").contains("Return of the Jedi").should("exist");
    cy.get("a").contains("See details").should("exist");
  });

  it("should navigate to details page", () => {
    cy.get('input[type="radio"]').check("movies");
    cy.searchFor("jedi");

    cy.get("a").contains("See details").click();

    cy.get("h1").contains("Return of the Jedi").should("exist");
    cy.get("pre").should("include.text", "Luke Skywalker has returned to");
  });

  it("should navigate to character details page from movie page", () => {
    cy.get('input[type="radio"]').check("movies");
    cy.searchFor("jedi");

    cy.get("a").contains("See details").click();

    cy.get("a").contains("Luke Skywalker").click();
    
    cy.url().should('include', '/person/1');
    cy.get("h1").contains("Luke Skywalker").should("exist");
  });
});
