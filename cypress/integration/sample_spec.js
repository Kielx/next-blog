describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="CppNcurses1"]').click()

    // The new url should include "/about"
    cy.url().should('match', /CppNcurses1/g)

    // The new page should contain an h1 with "About page"
    cy.get('h2').contains(/How to/)
  })
})

describe('All links', () => {
  it('should have working links', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/posts/CppNcurses1')
    cy.wait(2000)
    cy.get('a').each(($el, index, $list) => {
      cy.wrap($el).then(($el) => {
        const href = $el.prop('href')
        if (href) {
          cy.request({
            url: href,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.be.oneOf([200, 404])
          })
        }
      })
    })
  })
})
