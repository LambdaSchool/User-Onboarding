describe("my first test", function(){
it("Visits the kitchen sink", function(){
cy.visit("https://example.cypress.io")

cy.contains("type").click()

cy.get(".action-email")
.type("fake@email.com")
.should("have.value", "fake@email.com")
})
})
