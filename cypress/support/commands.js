Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (firstName, lastName, email, phone) => {
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type('Test')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
});

Cypress.Commands.add("typeLongText", () => {
    const longText = 'Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test'

    cy.get('#open-text-area').type(longText, {delay: 0})
});
