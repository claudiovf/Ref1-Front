describe('Driver Profile ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.contains('HAMILTON').click({force: true})
    })


    it('Circuit profile has bio info', function() {
        cy.contains("LEWIS HAMILTON")
        cy.contains("British")
        cy.contains("07/01/1985")
        cy.contains("Mercedes AMG Petronas F1 Team")

    })
    it('Achievements can be seen', function() {
        cy.contains("Achievements")
        cy.contains("World Champion")
        cy.contains("25+ Race Wins")
        cy.contains("25+ Podium Finishes")
        cy.contains("25+ Points Finishes")
        cy.contains("200+ Race Entries")
  
    })
  
    it('Driver periods can be seen', function() {
        cy.get("#driver-period-scroll")
          .then($periods => $periods.length === 18)
    })

    it('Periods can be selected', function() {
        cy.contains("Mclaren").click({ force: true})
        cy.contains("Brazilian Grand Prix")
        cy.contains("25/11/2012")
    })

    it('at least 1 stat of each section is visible', function() {
        cy.contains('Average Points')
        cy.contains('Driver Ahead')
    })
    it('Podiums total is visible', function() {
        cy.contains('Podiums').parent().contains('169')
    })
    it('Point Finishes total is visible', function() {
        cy.contains('Point Finishes').parent().contains('234')
    })
    it('DNFs total is visible', function() {
        cy.contains('DNFs').parent().contains('24')
    })

    describe('User can return to home from Driver Profile', function() {
        it('User can return to home via ref1 logo', function() {
            cy.contains("REF1").click({ force: true})
            cy.contains('Up Next:')
        })
        it('User can return to home via Back Home button', function() {
            cy.contains("Lewis Hamilton").click({ force: true})
            cy.contains('Up Next:')
        })
    })

    describe('Header items are accessible from Driver Profile', function() {
        it('settings can be opened from home view', function() {
            cy.get('#settings').click()
            cy.contains('Settings')
            cy.contains('Dark Mode')
        })
        it('Header Search can be opened from Driver Profile', function() {
            cy.get('#header-search').click()
            cy.contains('Search')
            cy.contains('Show results for')
        })
    })
})