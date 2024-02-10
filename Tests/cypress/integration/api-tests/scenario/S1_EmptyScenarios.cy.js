// Test Name:   S1_EmptyScenarios.cy.js
//
// Description: Query all existing scenarios and delete them.
//
// Act:         Query all existing scenarios in database [GET]
// Act:         Delete all existing scenarios in database [DELETE]
// Assert:      Deletion successful

describe("Empty scenario database.", () => {
   const allScenariosLink = "api/v1/projects/scenarios";
   const userDataLinkWithId = (scenarioId) => `api/v1/projects/scenarios/${scenarioId}`;
   const apiUrl = Cypress.config('url');

   it('fetches all scenarios and deletes them [GET, DELETE]', () => {
      // fetch scenarios
      cy.request('GET', `${apiUrl}${allScenariosLink}`)
         .its('body')
         .then((body) => {
            if (body.length > 0) {
               // if the array is not empty, delete each scenario
               body.forEach(scenario => {
                  const scenarioId = scenario.scenarioId;
                  // delete scenario
                  cy.request('DELETE', `${apiUrl}${userDataLinkWithId(scenarioId)}`).as('deleteDetails');

                  // verify status code and response body for deleted scenario
                  cy.get('@deleteDetails').its('status').should('eq', 200);
                  cy.get('@deleteDetails').then((response) => {
                     expect(response.statusText).to.eq("OK");
                  });
               });
            } else {
               // log message indicating that scenario database was empty
               cy.log('No scenarios found, scenario database was empty.');
            }
         });
   });
});

