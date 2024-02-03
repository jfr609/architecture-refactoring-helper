// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//
// Custom command: Utility function to handle PUT requests
//
Cypress.Commands.add('updateData', (requestData, reqUrl) => {
   cy.request({
      method: 'PUT',
      // update URL according to API endpoint
      url: reqUrl,
      headers: {
         'Content-Type': 'application/json',
         // add additional headers as needed
      },
      body: requestData,
      // prevent failing on non 2xx status codes
      failOnStatusCode: false,
   });
});

//
// Custom command: Utility function to handle POST requests
//
Cypress.Commands.add('saveData', (requestData, reqUrl) => {
   cy.request({
      method: 'POST',
      // update URL according to API endpoint
      url: reqUrl,
      headers: {
         'Content-Type': 'application/json',
         // add additional headers as needed
      },
      body: requestData,
      // prevent failing on non 2xx status codes
      failOnStatusCode: false,
   });
});

//
// Custom command: Utility function to handle GET requests
//
Cypress.Commands.add('getData', (reqUrl) => {
   cy.request({
      method: 'GET',
      // update URL according to API endpoint
      url: reqUrl,
      // prevent failing on non 2xx status codes
      failOnStatusCode: false,
   });
});