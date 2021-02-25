describe("User Entry App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  const nameInp = () => cy.get("input[name=name]");
  const emailInp = () => cy.get("input[name=email]");
  const passInp = () => cy.get("input[name=password]");
  const tosBox = () => cy.get("input[type=checkbox]");
  const subButt = () => cy.get("button[type=submit]");
  const dropD = () => cy.get("select");
  const cheese = () => cy.get("input[value=blue]");

  it("Test working check", () => {
    expect(1 + 1).to.equal(2);
  });

  it("check inputs are working", () => {
    nameInp().type("Mr Fuerte");
    nameInp().should("have.value", "Mr Fuerte");
    emailInp().type("MrFuerte@gmail.com");
    emailInp().should("have.value", "MrFuerte@gmail.com");
    passInp().type("MyPass");
    passInp().should("have.value", "MyPass");
    tosBox().click();
    dropD().select("1");
    cheese().click();
    subButt().click();
  });
});
