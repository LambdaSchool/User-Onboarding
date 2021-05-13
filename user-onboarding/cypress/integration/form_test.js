describe('new user form', () => {
  const nameInput = () => cy.get('[name="name"]')
  const emailInput = () => cy.get('[name="email"]')
  const pwdInput = () => cy.get('[name="password"]')

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('renders properly', () => {
    nameInput().should('exist')
    emailInput().should('exist')
    pwdInput().should('exist')
  })

  it('can type in input', () => {
      const name = "aidan"
      const email = "aidan@example.com"
      const password = "12345qwert"

      nameInput().type(name).should('have.value', name)
      emailInput().type(email).should('have.value', email)
      pwdInput().type(password).should('have.value', password)
    })

  it('can accept tos', () => {
    cy.get('[type="checkbox"]').check()
    cy.get('[type="checkbox"]').should('be.checked')
  })

  it('can submit form', () => {
    cy.get('form').submit()
  })

  it('cannot submit empty form', () => {
    nameInput().clear()
    cy.get('[type="submit"]').should('be.disbaled')
  })
})
