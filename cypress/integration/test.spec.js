/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays two todo items by default', { scrollBehavior: false }, () => {


    cy.get('[data-cy="favorite"]').first().click();

    cy.reload();

    cy.get('[data-cy="favorite"]').first()
      .invoke('attr', 'fill')
        .should('eq', '#438a14');

    cy.get('[data-cy="search-input"]').type('brewery');

    cy.get('[data-cy="filter-button"]').click();


  })

  it('displays proper view for devices', { scrollBehavior: false }, () => {

    cy.viewport(375, 812) //iphoneX

    cy.get('[data-cy="toggle-view-button"]')
      .should('be.visible')
      .should('have.text', 'List')
      .click();

    cy.get('[data-cy="toggle-view-button"]')
      .should('be.visible')
      .should('have.text', 'Map');

      cy.get('[data-cy="favorite"]').first().click();

      cy.reload();

      cy.get('[data-cy="toggle-view-button"]')
        .should('be.visible')
        .should('have.text', 'List')
        .click();
  
      cy.get('[data-cy="favorite"]').first()
        .invoke('attr', 'fill')
          .should('eq', '#438a14');

  })

});