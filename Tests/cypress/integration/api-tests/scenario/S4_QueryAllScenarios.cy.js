// Test Name:   S4_QueryAllScenarios.cy.js
//
// Description: Query all scenarios in database.
//
// Act:         Query all existing scenarios in database [GET]
// Assert:      Query successful 
// Assert:      Response contains valid scenarios 
// Assert:      Empty database returns zero length array

describe("Query all scenarios from database.", () => {
   const allScenariosLink = "api/v1/projects/scenarios";
   const apiUrl = Cypress.config('url');

   it('fetches all scenarios [GET]', () => {
      cy.request('GET', `${apiUrl}${allScenariosLink}`)
         .its('status')
         .should('equal', 200);
   });

   it('verifies fetched scenarios [GET]', () => {
      cy.request('GET', `${apiUrl}${allScenariosLink}`)
         .its('body')
         .then((body) => {
            cy.log('Actual Response Body:', body);

            // ensure that response body is an array type
            expect(body).to.be.an('array');

            if (body.length > 0) {
               // if the array is not empty, verify properties of each scenario
               body.forEach(scenario => {
                  expect(scenario).to.have.property('scenarioId');
                  expect(scenario).to.have.property('name');
                  expect(scenario).to.have.property('description');
                  expect(scenario).to.have.property('difficulty');
                  expect(scenario).to.have.property('importance');
               });
            } else {
               // verify array size   
               assert.strictEqual(body.length, 0, 'The response array should be empty.');
               // if response array is empty, log a message
               cy.log('No scenarios returned, response array is empty.');
            }
         });
   });
});