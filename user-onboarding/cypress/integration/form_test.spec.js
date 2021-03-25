
describe('Form Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passwordInput = () => cy.get('input[name="password"]');
    const tosInput = () => cy.get('input[name="tos"]');
    const submitButton = () => cy.get('button');
    const roleSelect = () => cy.get("select");

    it('sanity test to make sure that test works', () => {
        expect(true).to.equal(true);
        expect(2+2).not.to.equal(5);
    });

    it('Get the "Name" input and type a name in it.', () => {
        nameInput()
            .type('Justin Peczenij')
            .should('have.value', 'Justin Peczenij');
    });
   
    it('Get the "Email" input and type an email address in it.', () => {
        emailInput()
            .type('justinpeczenij@gmail.com')
            .should('have.value', 'justinpeczenij@gmail.com');
    });

    it('Get the "Password" input and type a password in it.', () => {
        passwordInput()
            .type('allfoonobar')
            .should('have.value', 'allfoonobar');
    });

    it('Check if user can check the TOS box', () => {
        tosInput()
            .check()
            .should('have.checked', 'true');
    })

    it('Check if user can submit form data', () => {
        // Fill out form
        nameInput().type('Justin Peczenij');
        emailInput().type('justinpeczenij@gmail.com');
        passwordInput().type('nobarallfoo');
        roleSelect().select('frontend')
        // Check for disabled submit on partial fill
        submitButton().should('be.disabled');
        tosInput().check()
        // Submit and clear form
        submitButton().click();
        //Check for submit
        nameInput().should('have.value', '');
        emailInput().should('have.value', '');
        passwordInput().should('have.value', '');
        tosInput().should('not.be.true');
    })
  
    it('Check for validation if a form is left unfilled', () => {
        passwordInput().type('foobar')
        cy.get('.errors').should('exist')
    })
    

    // This will pass because my form errors are saved in memory.
    // I thought it would fail due to the errors not being printed on screen.
    // Good to know!
    it('Check for validation if a form is left empty', () => {
        cy.get('.errors').should('exist')
    })

    it('Check if form validation goes away on role change', () => {
        roleSelect().select('frontend');
        cy.get('.role h4')
            .should('not.visible')
    })    


})
