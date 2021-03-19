describe('MVP Tests', function () {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Is this rendering?', () => {
        cy.visit('http://localhost:3000/');
    })

    it('Can you type inside the multiple inputs, check the checkboxes and submit data?', () => {
        cy.get('label > input').type('Nathan')
        cy.get('[name="email"]').type('nathan.adel.chagar@gmail.com')
        cy.get('[name="password"]').type('Password#1234')
        cy.get('[name="terms"]').click()
        cy.get('button').click()
    }) //Success!!
    
    describe('Checking Validation', () => {
        it('Testing validation by unfufilling requirements', () => {
            cy.get('label > input').type('A')
            cy.get('[name="email"]').type('nathan')
            cy.get('[name="password"]').type('A')
            cy.get('button').click()
        })
    }) //Succsess
});
