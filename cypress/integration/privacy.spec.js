describe('Política de privacidade Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/privacy.html')
    })

it.only('Should verify the application title', function(){
    cy.get('#title')
      .should('be.visible')
      .should('have.text', 'CAC TAT - Política de privacidade')
  })
})