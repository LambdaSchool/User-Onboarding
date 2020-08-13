describe('Testing form input and submission', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Adds text to inputs and submits the form', () => {

    //test name input
    cy
    .get('[data-cy=name]')
    .type('Jared')
    .should('have.value', 'Jared')

    
    //test email input
    cy
    .get('[data-cy=email]')
    .type('test@email.com')
    .should('have.value', 'test@email.com')


    //test password
    cy
    .get('[data-cy=password]')
    .type('hutenosahu')
    .should('have.value', 'hutenosahu')

    cy
    .get('[data-cy=terms]')
    .check()
    .should('be.checked')

    cy
    .get('[data-cy=submit]')
    .click()

  })
})