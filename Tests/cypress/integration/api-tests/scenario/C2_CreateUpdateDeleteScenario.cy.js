// Test Name:   C2_CreateUpdateDeleteScenario.cy.js
//
// Description: Step 1: Create random scenario and add it to the database.
//              Step 2: Update the created scenario in the database.
//              Step 3: Delete the created scenario from the database.
//
// Arrange:     Create random scenario
// Act:         Add random scenario to database [POST]
// Assert:      Addition successful
//
// Arrange:     Update the before added random scenario
// Act:         Add updated scenario to database [POST]
// Assert:      Update successful
//
// Act:         Delete the before added and updated scenario [DELETE]
// Assert:      Deletion successful

describe('Create, update, and delete a scenario in the database.', () => {
   const userDataLink = "api/v1/projects/scenarios";
   const userDataLinkWithId = (scenarioId) => `api/v1/projects/scenarios/${scenarioId}`;
   const apiUrl = Cypress.config('url');

   let latestScenario;
   let latestScenarioId;

   // generate a unique identifier by time stamp and random number
   const uniqueIdentifier = Date.now() + Math.floor(Math.random() * 1000);

   const dataToSave = {
      description: `Cypress Test Scenario ${uniqueIdentifier} Description`,
      difficulty: "B",
      importance: "A",
      name: `Cypress Test Scenario ${uniqueIdentifier}`,
      qualities: [{
            category: "Attribute",
            name: "Portability",
            qualitySublevels: [{
                  name: 'Adaptability',
                  qualityName: 'Portability'
               },
               {
                  name: 'Agility',
                  qualityName: 'Portability'
               },
               {
                  name: 'Deployability',
                  qualityName: 'Portability'
               },
               {
                  name: 'Installability',
                  qualityName: 'Portability'
               },
               {
                  name: 'Replaceability',
                  qualityName: 'Portability'
               }
            ]
         },
         {
            category: "Attribute",
            name: "Reliability",
            qualitySublevels: [{
                  name: 'Availability',
                  qualityName: 'Reliability'
               },
               {
                  name: 'Fault Tolerance',
                  qualityName: 'Reliability'
               },
               {
                  name: 'Recoverability',
                  qualityName: 'Reliability'
               }
            ]
         },
         {
            category: "Attribute",
            name: "Independence",
            qualitySublevels: []
         }
      ],
      qualitySublevels: [{
            name: 'Adaptability',
            qualityName: 'Portability'
         },
         {
            name: 'Deployability',
            qualityName: 'Portability'
         },
         {
            name: 'Installability',
            qualityName: 'Portability'
         },
         {
            name: 'Replaceability',
            qualityName: 'Portability'
         },
         {
            name: 'Availability',
            qualityName: 'Reliability'
         },
         {
            name: 'Fault Tolerance',
            qualityName: 'Reliability'
         },
         {
            name: 'Recoverability',
            qualityName: 'Reliability'
         }
      ]
   };

   // add created sample scenario
   it('saves scenario in database [POST]', () => {
      cy.saveData(dataToSave, `${apiUrl}${userDataLink}`).as('createDetails');

      // verify status code and response body for added scenario
      cy.get('@createDetails').its('status').should('eq', 200);
      cy.get('@createDetails').then((response) => {
         expect(response.statusText).to.eq("OK");
      });
   });

   // update created sample scenario
   it('saves scenario in database [GET, POST]', () => {
      // fetch all scenarios and keep newest as "latestScenario"
      cy.request('GET', `${apiUrl}${userDataLink}`)
         .its('body')
         .then((body) => {
            const scenarios = body;

            // locate the latest scenario
            latestScenario = scenarios.reduce((maxScenario, currentScenario) => {
               return currentScenario.scenarioId > (maxScenario?.scenarioId || 0) ? currentScenario : maxScenario;
            }, null);

            // keep ID of latest scenario
            latestScenarioId = latestScenario?.scenarioId;

            // change scenario qualities
            latestScenario.description = `Cypress Test Scenario ${uniqueIdentifier} Description Update`;
            latestScenario.qualitySublevels = [{
                  name: 'Adaptability',
                  qualityName: 'Portability'
               },
               {
                  name: 'Availability',
                  qualityName: 'Reliability'
               }
            ];

            // update scenario
            cy.updateData(latestScenario, `${apiUrl}${userDataLinkWithId(latestScenarioId)}`).as('updateDetails');
         })
         .then(() => {
            // verify status code and response body for added scenario
            cy.get('@updateDetails').its('status').should('eq', 200);
            cy.get('@updateDetails').then((response) => {
               expect(response.statusText).to.eq("OK");
            });
         });
   });

   // delete created/updated sample scenario
   it('deletes the scenario [DELETE]', () => {
      cy.request('DELETE', `${apiUrl}${userDataLinkWithId(latestScenarioId)}`).as('deleteDetails');

      // verify status code and response body for deleted scenario
      cy.get('@deleteDetails').its('status').should('eq', 200);
      cy.get('@deleteDetails').then((response) => {
         expect(response.statusText).to.eq("OK");
      });
   });
});
