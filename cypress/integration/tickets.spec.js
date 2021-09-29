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

    it.only('select two tickets', () => {
        cy.get('#ticket-quantity').select('2')
    });

    it("has 'ticketbox' header's heading", () => {});
})