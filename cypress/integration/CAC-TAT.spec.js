/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html')
    })


    it('Should verify the application title', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('Should fill in the mandatory fields and submit the form', function() {
      cy.get('#firstName')
        .type('Naruto', {delay: 0})
      cy.get('#lastName')
        .type('Uzumaki')
      cy.get('#email')
        .type('naruto@gmail.com')
      cy.typeLongText()
      cy.get('button[type="submit"]')
        .click()
      cy.get('.success')
      .should('be.visible')
    })


    it('Should display an error message when submitting the form with an email in an invalid format', function() {
      cy.get('#email')
        .type('naruto#gmail')
      cy.get('button[type="submit"]')
        .click()
      cy.get('.error')
        .should('be.visible')
    })


    it('Should enter a non-numeric value in the phone field', function() {
      cy.get('#phone')
        .type('Words')
      cy.get('#phone')
        .should('not.have.text', 'Words')
    })


    it('Should display an error message when the phone number becomes mandatory but is not filled in before submitting the form', function() {
      cy.get('#firstName')
        .type('Naruto')
      cy.get('#lastName')
        .type('Uzumaki')
      cy.get('#email')
        .type('naruto@gmail.com')
      cy.get('#phone-checkbox')
        .check()
      cy.get('#phone')
        .should('not.have.text')
      cy.get('button[type="submit"]')
        .click()
      cy.get('.error')
        .should('be.visible')
    })


    it('Should fill and clean the fields firstName, lastName, email and phone', function() {
      cy.get('#firstName')
        .type('Naruto')
        .should('have.value', 'Naruto')
        .clear()
        .should('have.value', '')
      cy.get('#lastName').type('Uzumaki')
        .should('have.value', 'Uzumaki')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('naruto@gmail.com')
        .should('have.value', 'naruto@gmail.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('993483455')
        .should('have.value', '993483455')
        .clear()
        .should('have.value', '')
    })


      it('Should display an error message when the form is submitted', function() {
        cy.get('button[type="submit"]')
          .click()
        cy.get('.error')
          .should('be.visible')
      })


      it('Should successfully submit the form using a custom command', function() {
        cy.fillMandatoryFieldsAndSubmit('Naruto', 'Uzumaki', 'narutouzumaki@gmail.com', '993483455')
      })


      it('Should submit the form using cy.contains', function() {
        cy.get('#firstName')
          .type('Naruto')
        cy.get('#lastName')
          .type('Uzumaki')
        cy.get('#email')
          .type('naruto@gmail.com')
        cy.get('#open-text-area')
          .type('Test')
        cy.contains('Enviar')
          .click()
        cy.get('.success').should('be.visible')
      })

      it('Select a product (Youtube) for your text', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
      })

      it('Select a product (Mentoria) for your value(value)', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
      })

      it('Select a product (Blog) for your index', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
      })

      it('Check the service type "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
      })

      it('Check each service type "Feedback', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
          cy.wrap($radio)
            .check()
          cy.wrap($radio)
            .should('be.checked')
        })
      })

      it('Check each checkboxes, after uncheck the last', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
        })

        it('Select a file from fixtures folder', function(){
          cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input)  {
              expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('Select a file simulate a drag-and-drop', function(){
          cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input)  {
              expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('Selects a file using a fixture for which an alias has been given', function(){
          cy.document()
            .fixture('example.json').as('sampleFile')
          cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input)  {
              expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('Verify if the privacy policy is opened on another page without the need for a click', function(){
          cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
        })

        it('Access the privacy policy page, remove the target, and then click on the link', function(){
          cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
          cy.contains('Talking About Testing')
            .should('be.visible')
        })
      })
