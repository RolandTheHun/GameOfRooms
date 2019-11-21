describe('Login/Logout Test', function () {
    it('Checking login and logout with Assertions', function () {
        cy.visit('http://localhost:4200')

        cy.contains('GameOfRooms')

        cy.visit('http://localhost:4200/reservations')

        cy.wait(3000)

        cy.get('.ajs-message').contains('You shall not pass!!!').should('be.visible')
        cy.get('.nav-link').should('not.exist')
        cy.get('.nav-link').should('not.exist')

        cy.get('[name="username"]').type('Batman')
        cy.get('[name="password"]').type('password')

        cy.get('button').contains('Login').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Logged in successfully!').should('be.visible')
        cy.get('.nav-link').contains('Reservations').should('exist')
        cy.get('.nav-link').contains('Ratings').should('exist')

        cy.url().should('include', '/reservations')

        cy.get('.dropdown').click()
        cy.get('.dropdown-item').contains('Logout').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Logged out!').should('be.visible')
        cy.get('.nav-link').should('not.exist')
        cy.get('.nav-link').should('not.exist')
    })
})