// Test Name:   T3_QueryToolDatabase.cy.js
//
// Description: Query tool database.
//
// Act:         Query all existing tools in database [GET]
// Assert:      Query successful 
// Assert:      Response contains valid tools 
// Assert:      Empty database returns zero length array

describe("Query all tools.", () => {
   const allToolsLink = "api/v1/tools";
   const apiUrl = Cypress.config('url');

   it('fetches all tools [GET]', () => {
      cy.request('GET', `${apiUrl}${allToolsLink}`)
         .its('status')
         .should('equal', 200);
   });

   it('verifies fetched tools [GET]', () => {
      cy.request('GET', `${apiUrl}${allToolsLink}`)
         .its('body')
         .then((body) => {
            cy.log('Actual Response Body:', body);

            // ensure that response body is an array type
            expect(body).to.be.an('array');

            if (body.length > 0) {
               // if response array is not empty, verify properties of each tool
               body.forEach(tool => {
                  expect(tool).to.have.property('toolId');
                  expect(tool.toolSource).to.have.property('author');
                  expect(tool.toolSource).to.have.property('description');
                  expect(tool.toolSource).to.have.property('link');
                  expect(tool.toolSource).to.have.property('name');
               });
            } else {
               // verify array size
               assert.strictEqual(body.length, 0, 'The response array should be empty.');
               // if response array is empty, log a message
               cy.log('No tools returned, response array is empty.');
            }
         });
   });
});