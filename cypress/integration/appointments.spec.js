describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("li", "Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones", {
      delay: 100,
    });
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("button", "Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones").and(
      "contain",
      "Sylvia Palmer"
    );
  });

  it("should edit an interview", () => {
    cy.contains("[data-testid=appointment]", "Archie Cohen")
      .children()
      .eq(1)
      .realHover();
    
    cy.get("[alt=Edit]").should("be.visible").click();
    
    cy.get("[data-testid=student-name-input]").clear().type("Kate Bush");

    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("button", "Save").click();

    cy.contains(".appointment__card--show", "Kate Bush").and(
      "contain",
      "Tori Malcolm"
    );
  });
});
