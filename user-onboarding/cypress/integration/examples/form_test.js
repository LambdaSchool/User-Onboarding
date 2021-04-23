describe('user onboarding', () => {

    beforeEach( () => {
        cy.visit('http://localhost:3000/')
    })

    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termInput = () => cy.get('input[name=terms]')
    const buttonInput = () => cy.get('button')
    const form = () => cy.get('Form')
   

    it('proper elements exist', () => {
        expect(5).to.equal(5)
        expect(5).to.eql(5)
        expect(5 + 1).to.not.equal(7)
        nameInput().should('exist')
        emailInput().should('exist')
        passwordInput().should('exist')
        termInput().should('exist')
        buttonInput().should('exist')
    })

    describe('filling out inputs', () => {
        it('can type inside the inputs', () => {
            nameInput()
                .should('have.value', '')
                .type('kaseem')
                .should('have.value', 'kaseem')
            emailInput()
                .should('have.value', '')
                .type('kaseembradley24@gmail.com')
                .should('have.value', 'kaseembradley24@gmail.com')
            passwordInput()
                .should('have.value', '')
                .type('password')
                .should('have.value', 'password')
        })

        it('can check terms box', () => {
            termInput()
            .should('have.value', 'false')
            .check()
            .should('have.value', 'true')
        })

        it('can submit form data', () => {
            form()
                .submit()
                .should('have.value', '')
            buttonInput()
                .should('be.disabled')
                
        })

        it('validation tests', () => {
            nameInput()
                .should('have.value', '')
                .type('kaseem')
                .should('not.have.value', '')
                buttonInput().should('be.disabled')

            emailInput()
                .should('have.value', '')
                .type('kaseem@gmail.com')
                .should('not.have.value', '')
                buttonInput().should('be.disabled')
           
            passwordInput()
                .should('have.value', '')
                .type('pass')
                .should('not.have.value', '')
                buttonInput().should('be.disabled')

            termInput()
                .should('have.value', 'false')
                .check()
                .should('have.value', 'true')
                buttonInput().should('not.be.disabled')

        })
    })
})