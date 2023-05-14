describe("Search People", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "http://localhost:3000/api/people?search=Luke%20Skywalker",
      {
        fixture: "search-luke.json",
      }
    );

    cy.intercept("GET", "http://localhost:3000/api/person?id=1", {
      fixture: "luke-skywalker.json",
    });

    cy.visit("http://localhost:3000/");
  });

  it("should search for Luke Skywalker", () => {
    cy.searchFor("Luke Skywalker");

    cy.get("span").contains("Luke Skywalker").should("exist");
    cy.get("a").contains("See details").should("exist");
  });

  it("should navigate to details page", () => {
    cy.searchFor("Luke Skywalker");

    cy.get("a").contains("See details").click();

    cy.get("h1").contains("Luke Skywalker").should("exist");
    cy.get("span").contains("Height: 172").should("exist");
  });

  it("should navigate to movie details page from character page", () => {
    cy.searchFor("Luke Skywalker");
    cy.get("a").contains("See details").click();

    cy.get("a").contains("Return of the Jedi").click();
    
    cy.url().should('include', '/movies/3');
    cy.get("h1").contains("Return of the Jedi").should("exist");
  });
});
