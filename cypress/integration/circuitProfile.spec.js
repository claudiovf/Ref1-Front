describe('Circuit Profile ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.contains('2021 Calendar').click({force: true})
        cy.contains("Bahrain GP").click({force: true})
    })


    it('Circuit profile has title', function() {
        cy.contains("BAHRAIN GP")
        cy.contains("Bahrain International Circuit")
        cy.contains("Sakhir, Bahrain")

    })
    it('Schedule time can be toggled', function() {
        cy.contains("Event Schedule")
        cy.contains("21:30")
        cy.contains("Track Time").click()
        cy.contains("14:30")
        cy.contains("Your Time").click()
        cy.contains("21:30")
    })
    it('has circuit information section', function() {
        cy.contains("Circuit Information")
    })
    it('Previous Results options can be seen', function() {
        cy.contains("Previous Results")
        cy.contains("2021")
        cy.contains("2004")
    })
    it('Previous Results can be selected', function() {
        cy.contains("Previous Results")
        cy.contains("2006").click({ force: true})
        cy.contains("Michael Schumacher")
        cy.contains("1:29:46.205")
    })
    
    describe('User can return to home from Circuit Profile', function() {
        it('User can return to home via ref1 logo', function() {
            cy.contains("REF1").click({ force: true})
            cy.contains('Up Next:')
        })
        it('User can return to home via Back Home button', function() {
            cy.contains("Bahrain Grand Prix").click({ force: true})
            cy.contains('Up Next:')
        })
    })

    describe('Header items are accessible from Circuit Profile', function() {
        it('settings can be opened from home view', function() {
            cy.get('#settings').click()
            cy.contains('Settings')
            cy.contains('Dark Mode')
        })
        it('Header Search can be opened from Circuit Profile', function() {
            cy.get('#header-search').click()
            cy.contains('Search')
            cy.contains('Show results for')
        })
    })
})