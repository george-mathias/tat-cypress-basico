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

    it('selects "friend", and "publication", then uncheck "friend"', () => {
        cy.get('#friend').check()
        cy.get('#publication').check()
        cy.get('#friend').uncheck()
    });

    it("has 'ticketbox' header's heading", () => {
        cy.get('header h1').should('contain', 'TICKETBOX')
    });

    it('alerts on invalid email', () => {
        cy.get('#email')
          .as('email')
          .type('talkingabouttesting-gmail.com')

        cy.get('#email.invalid').should('exist')

        cy.get('@email')
          .clear()
          .type('talkingabouttesting@gmail.com')

        cy.get('#email.invalid').should('not.exist')
    });


    it.only('fills and reset the form', () => {
      const firstName = 'George'
      const lastName = 'Mathias'
      const quantity = '2'
      const fullName = `${firstName} ${lastName}`

      cy.get('#first-name').type(firstName)
      cy.get('#last-name').type(lastName)
      cy.get('#email').type('mathias@gmail.com')
      cy.get('#ticket-quantity').select(quantity)
      cy.get('#vip').check();
      cy.get('#friend').check()
      cy.get('#requests').type('IPA Beer')

      cy.get('.agreement p').should(
        'contain',
        `I, ${fullName}, wish to buy ${quantity} VIP tickets.`
      )

      cy.get('#agree').click()
      cy.get('#signature').type(fullName)

      cy.get('button[type="submit"]')
        .as('sbumtButton')
        .should('not.be.disabled')
        
      cy.get('[type="submit"]').click()
      cy.get('.success > p').should('contain', 'Ticket(s) successfully ordered.')
    });

})