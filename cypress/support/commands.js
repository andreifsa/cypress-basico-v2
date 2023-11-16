Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
    cy.get('#firstName').type('Naruto')
    cy.get('#lastName').type('Uzumaki')
    cy.get('#email').type('narutouzumaki@gmail.com')
    cy.get('#open-text-area').type('Test')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
});
