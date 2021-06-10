describe('Ref1 Home', function() {

    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })
  
    describe('Home sections', function() {
        it('Event widget can be seen', function() {
            cy.contains('Up Next:')
            cy.contains('FP1')
            cy.contains('FP2')
            cy.contains('FP3')
            cy.contains('Qualifying')
            cy.contains('Race')
            cy.contains('Days')
            cy.contains('Hours')
            cy.contains('Mins')
            cy.contains('Secs')
            cy.contains('2021 Calendar')
        })
        it('Calendar can be seen when expanded', function() {
            cy.contains('2021 Calendar').click()
            cy.get('#calendar-scroll')
            .then($scroll => $scroll.length === 22)
           
        })
    
        it('weather forecast/message can be seen', function() {
        cy.get('#count-days')
            .then($days => $days.text() > 5 
                ? cy.contains("Weather Forecast")
                : cy.contains("*Weather forecast is available during race week")
            )
        })

        it('Cards options can be seen', function() {
            cy.contains('2021 Drivers')
            cy.contains('2021 Teams')
            cy.contains('Standings')
            cy.contains('Explore')
            cy.contains('Legends')
            cy.contains('Sky Sports Team')
        })

        it('2021 Drivers can be seen', function() {
            cy.contains('2021 Drivers').click()
            cy.get('#drivers-2021-scroll')
            .then($scroll => $scroll.length === 20)
        })
    
        it('2021 Teams can be seen', function() {
            cy.contains('2021 Teams').click()
            cy.get('#teams-2021-scroll')
            .then($scroll => $scroll.length === 10)
        })
        it('Standings cards can be seen', function() {
            cy.get('#Standings').click()
            cy.get('#standings-scroll')
            .then($scroll => $scroll.length === 2)
        })
        it('Explore cards can be seen', function() {
            cy.get('#Explore').click()
            cy.get('#explore-drivers-scroll')
            .then($scroll => $scroll.length === 4)
            cy.get('#explore-teams-scroll')
            .then($scroll => $scroll.length === 4)
        })
        it('Legends cards can be seen', function() {
            cy.get('#Legends').click()
            cy.get('#legends-scroll')
            .then($scroll => $scroll.length === 12)
        })
    })

    describe('Header Icons are accessible from home', function() {
        it('settings can be opened from home view', function() {
            cy.get('#settings').click()
            cy.contains('Settings')
            cy.contains('Dark Mode')
        })
        it('Header Search can be opened from home view', function() {
            cy.get('#header-search').click()
            cy.contains('Search')
            cy.contains('Show results for')
        })
    })
  })