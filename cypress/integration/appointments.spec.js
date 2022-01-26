describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("li", "Monday");
    cy.get("[data-testid=appointment]")
      .eq(0)
      .children()
      .eq(1)
      .as('firstAppt');
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("button", "Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones").and(
      "contain",
      "Sylvia Palmer"
    );
  });

  it("should edit an interview", () => {
    cy.get('@firstAppt').contains('Archie Cohen').realHover();
    
    cy.get("[alt=Edit]").should("be.visible").click();
    
    cy.get("[data-testid=student-name-input]").clear().type("Kate Bush", {
      delay: 100,
    });

    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("button", "Save").click();

    cy.contains(".appointment__card--show", "Kate Bush").and(
      "contain",
      "Tori Malcolm"
    );
  });
  
  it ('should cancel an interview', () => {
    cy.get('@firstAppt').contains('Archie Cohen').realHover();

    cy.get("[alt=Delete]").should("be.visible").click();

    cy.contains('button', 'Confirm').should("be.visible").click();

    cy.get('[data-testid=appointment]').contains('Deleting').should('exist');
    cy.get('[data-testid=appointment]').contains('Deleting').should('not.exist');

    cy.get('[data-testid=appointment]').contains('Archie Cohen').should('not.exist');
  });
});
