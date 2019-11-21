describe('Creating new reservation', function () {
    it('Heading to reservations and try to add like a student', function () {
        cy.visit('http://localhost:4200')

        cy.contains('GameOfRooms')

        cy.get('[name="username"]').type('Banks')
        cy.get('[name="password"]').type('password')

        cy.get('button').contains('Login').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Logged in successfully!').should('be.visible')

        cy.url().should('include', '/reservations')

        cy.get('button').contains('Add reservation').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('You shall not pass!').should('be.visible')

        cy.get('.dropdown').click()
        cy.get('.dropdown-item').contains('Logout').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Logged out!').should('be.visible')
    })
    it('Heading to reservations and try to add like a consultant', function () {
        cy.visit('http://localhost:4200')

        cy.contains('GameOfRooms')

        cy.get('[name="username"]').type('Batman')
        cy.get('[name="password"]').type('password')

        cy.get('button').contains('Login').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Logged in successfully!').should('be.visible')
        cy.url().should('include', '/reservations')

        cy.get('button').contains('Add reservation').click()

        cy.wait(3000)

        cy.url().should('include', '/reservations/add')

        cy.get('input[placeholder="HH"]').first().clear().type('12')
        cy.get('input[placeholder="MM"]').first().clear().type('15')

        cy.get('input[placeholder="HH"]').last().clear().type('14')
        cy.get('input[placeholder="MM"]').last().clear().type('00')

        cy.get('input[placeholder="Title of the consultation..."]').clear().type('Title')

        cy.get('textarea').clear().type('Summary')

        cy.get('select[id="roomId"]').select('222')

        cy.get('button').contains('Submit').click()

        cy.wait(5000)

        cy.get('.pagination-last').click()

        cy.wait(3000)

        cy.get('td').contains('12:15').should('exist')
        cy.get('td').contains('2:00').should('exist')
        cy.get('td').contains('Title').should('exist')

        cy.get('.dropdown').click()
        cy.get('.dropdown-item').contains('Logout').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Logged out!').should('be.visible')
    })
    it('Heading to reservations and try to edit and delete last added consultation', function () {
        cy.visit('http://localhost:4200')

        cy.contains('GameOfRooms')

        cy.get('[name="username"]').type('Batman')
        cy.get('[name="password"]').type('password')

        cy.get('button').contains('Login').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Logged in successfully!').should('be.visible')
        cy.url().should('include', '/reservations')

        cy.get('.pagination-last').click()

        cy.wait(3000)

        cy.get('td').contains('12:15').should('exist')
        cy.get('td').contains('2:00').should('exist')
        cy.get('td').contains('Title').should('exist')

        cy.get('.fa-edit').last().click()

        cy.wait(3000)

        cy.url().should('include', '/reservations/edit')

        cy.get('input[placeholder="HH"]').first().clear().type('13')
        cy.get('input[placeholder="MM"]').first().clear().type('15')

        cy.get('input[placeholder="HH"]').last().clear().type('16')
        cy.get('input[placeholder="MM"]').last().clear().type('00')

        cy.get('input[placeholder="Title of the consultation..."]').clear().type('Title updated')

        cy.get('textarea').clear().type('Summary updated')

        cy.get('select[id="roomId"]').select('111')

        cy.get('button').contains('Submit').click()

        cy.wait(5000)

        cy.get('.pagination-last').click()

        cy.wait(3000)

        cy.get('td').contains('1:15').should('exist')
        cy.get('td').contains('4:00').should('exist')
        cy.get('td').contains('Title updated').should('exist')


        cy.get('.fa-trash').last().click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Successfully deleted reservation!').should('be.visible')

        cy.get('td').contains('1:15').should('not.exist')
        cy.get('td').contains('4:00').should('not.exist')
        cy.get('td').contains('Title updated').should('not.exist')

        cy.get('.dropdown').click()
        cy.get('.dropdown-item').contains('Logout').click()

        cy.wait(3000)

        cy.get('.ajs-message').contains('Logged out!').should('be.visible')
    })
})