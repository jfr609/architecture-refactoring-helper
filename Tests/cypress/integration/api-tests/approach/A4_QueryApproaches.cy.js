// Test Name:   A4_QueryApproaches.cy.js
//
// Description: Query approach database.
//
// Act:         Query all existing approaches in database [GET]
// Assert:      Query successful 
// Assert:      Response contains valid approaches 
// Assert:      Empty database returns zero length array

describe("Query all approaches from database.", () => {
   const allApproachesLink = "api/v1/approaches";
   const apiUrl = Cypress.config('url');

   it('fetches all approaches [GET]', () => {
      cy.request('GET', `${apiUrl}${allApproachesLink}`)
         .its('status')
         .should('equal', 200);
   });

   it('verifies fetched approaches [GET]', () => {
      cy.request('GET', `${apiUrl}${allApproachesLink}`)
         .its('body')
         .then((body) => {
            cy.log('Actual Response Body:', body);

            // ensure that response body is an array type
            expect(body).to.be.an('array');

            if (body.length > 0) {
               // if response array is not empty, verify properties of each approach
               body.forEach(approach => {
                  expect(approach).to.have.property('refactoringApproachId');
                  expect(approach.approachSource).to.have.property('authors');
                  expect(approach.approachSource).to.have.property('link');
                  expect(approach.approachSource).to.have.property('title');
                  expect(approach.approachSource).to.have.property('year');
               });
            } else {
               // verify array size
               assert.strictEqual(body.length, 0, 'The response array should be empty.');
               // if response array is empty, log a message
               cy.log('No approaches returned, response array is empty.');
            }
         });
   });
});
