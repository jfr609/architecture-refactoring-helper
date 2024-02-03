// Test Name:   C5_QueryExistingScenario.cy.js
//
// Description: Query existing and non-existing scenario by ID. 
//              Prerequisite: Scenario with ID=0 does not exist in database.
//              Prerequisite: Scenario database is not empty.
//
// Arrange:     Query all existing scenarios in database and read first ID
// Act:         Query existing scenario by ID [GET]
// Assert:      Response contains correct scenario
//
// Act:         Query non-existing scenario with ID=0 [GET] 
// Assert:      Response returns status code 404 (Not Found)

describe("Query existing and non-existing scenario by ID", () => {
   const scenarioListLink = "api/v1/projects/scenarios";
   const scenarioDataLink = (scenarioId) => `api/v1/projects/scenarios/${scenarioId}`;
   const apiUrl = Cypress.config('url');

   let firstScenarioId;

   before(() => {
      // fetch all scenarios
      cy.getData(`${apiUrl}${scenarioListLink}`)
         .its('body')
         .then((body) => {
            // read first scenario
            const firstScenario = body[0];
            // verify that first scenario is valid
            if (firstScenario) {
               firstScenarioId = firstScenario.scenarioId;
            } else {
               // first scenario is invalid, set default value
               console.error('The first scenario is invalid.');
               firstScenarioId = 0;
            }
         });
   });

   it('fetches first scenario by ID [GET]', () => {
      cy.getData(`${apiUrl}${scenarioDataLink(firstScenarioId)}`)
         .its('status')
         .should('equal', 200);
   });

   it('verifies first scenario [GET]', () => {
      cy.getData(`${apiUrl}${scenarioDataLink(firstScenarioId)}`)
         .its('body')
         .then((body) => {
            cy.log('Actual Response Body:', body);
            expect(body).to.have.property('scenarioId', firstScenarioId);
         });
   });

   it('fetches invalid scenario with ID=0 [GET]', () => {
      cy.getData(`${apiUrl}${scenarioDataLink(0)}`)
         .its('status')
         .should('equal', 404);
   });
});