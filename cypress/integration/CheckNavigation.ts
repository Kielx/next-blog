describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="CppNcurses1"]').click()
    cy.wait(200)
    // The new url should include "/about"
    cy.url().should('match', /CppNcurses1/g)

    // The new page should contain an h1 with "About page"
    cy.get('h2').contains(/How to/)
  })
})

describe('Multi check navigation from top to bottom + PL', () => {

  const linksSet = new Set()
  const visitedSet = new Set()
  const checkAllLinks = (link : string) => {
    // Start from the index page
    cy.visit(link)
    // Wont work without this wait
    cy.wait(200)
    // Get all links on the page
    cy.get('a').each(($anchor1) => {
      // Wrap each of anchors 
      cy.wrap($anchor1).then(($anchor1a) => {
        // Get href attribute
        const href = $anchor1a.prop('href')
        if (href && href.match(/localhost/) && !visitedSet.has(href)) {
          // Add href to set - prevents double visits to same site
          visitedSet.add(href)
          // visit the page if it has not been visited yet and is of the same origin
          cy.visit(href).then(() => {
            cy.wait(200)
            // Get all links on visited page
            cy.get('a').each(($anchor2) => {
              cy.wrap($anchor2).then(($anchor2a) => {
                const hreff = $anchor2a.prop('href')
                // If link on the page is not null and has not been checked yet
                if (hreff && !linksSet.has(hreff)) {
                  // Push link to links set - prevents checking same links twice
                  linksSet.add(hreff)
                  // Check the link  
                  cy.request({
                    url: hreff,
                    failOnStatusCode: true,
                  }).then((response) => {
                    expect(response.status).to.equal(200)
                  })
                }
              })
            })
          })
        }
      })
    })
  }

  it('should have working links on all pages', () => {
    checkAllLinks('http://localhost:3000/')
    checkAllLinks('http://localhost:3000/pl')
    })
})



export {}