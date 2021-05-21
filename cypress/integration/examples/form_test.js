describe("Quotes App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  const nameInput = () => cy.get("input[name=name]"); ///in "input[name=name]" the second name is the value of the name key-----name='name' in my form.js
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const termsbox = () => cy.get('[type="checkbox"]');
  const submitBtn = () => cy.get('button[id="submitBtn"]');

  it("sanity check to make sure tests work", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
  });

  it("the proper elements are showing", () => {
    nameInput().should("exist");
  });

  it("can type in the inputs+checkbox", () => {
    nameInput()
      .should("have.value", "")
      .type("Be nice to the CSS expert")
      .should("have.value", "Be nice to the CSS expert");
    emailInput()
      .type("rod@stuntman.com")
      .should("have.value", "rod@stuntman.com");
    passwordInput().type("stunts4lyfe").should("have.value", "stunts4lyfe");
    termsbox().check();
  });
  it("can submit info", () => {
    nameInput().type("Lance");
    emailInput().type("Lance@dragontrainer.com");
    passwordInput().type("leaderofthefinalfour");
    termsbox().check();
    submitBtn().click();
  });
});
