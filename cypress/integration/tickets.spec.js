/// <reference types="cypress" />

describe('Tickets', () => {

    beforeEach(() => cy.visit('https://bit.ly/2XSuwCW')) 

    it('fills all the text input fields', () => {
        const firstName = "George"
        const lastName = "Mathias"

        cy.url().should('contain', 'https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
        cy.get('h1').should('contain', 'TICKETBOX')
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('mathias@gmail.com')
        cy.get('#requests').type('Vegetarian')
        cy.get('#signature').type(`${firstName} ${lastName}`)
        cy.get('#agree').check()
        cy.get('[type="submit"]').click()
        cy.get('.success > p').should('contain', 'Ticket(s) successfully ordered.')
    })

    it('select two tickets', () => {
        cy.get('#ticket-quantity').select('2')
    });

    it('select "vip" ticket type', () => {
        cy.get('#vip').check();
    });

    it('selects "social media" checkbox', () => {
        cy.get('#social-media').check()
    });

    it.only('selects "friend", and "publication", then uncheck "friend"', () => {
        cy.get('#friend').check()
        cy.get('#publication').check()
        cy.get('#friend').uncheck()
    });

    it("has 'ticketbox' header's heading", () => {});
})