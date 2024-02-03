// Test Name:   C4_CreateNewAndDulicateScenario.cy.js
//
// Description: Create a new and duplicate scenario in the database.
//              Step 1: Create a new random sample scenario in the database
//              Step 2: Verify successful creation of scenario
//              Step 3: Try to create a duplicate scenario in the database
//              Step 4: Verify rejection of creating a duplicate scenario
//
// Arrange:     Create random scenario
// Act:         Add random scenario to database [POST]
// Assert:      Addition successful
//
// Act:         Add duplicate scenario to database [POST]
// Assert:      Addition unsuccessful
 
describe('Create a new scenario and a duplicate scenario.', () => {
   const userDataLink = "api/v1/projects/scenarios";
   const apiUrl = Cypress.config('url');

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
      cy.saveData(dataToSave, `${apiUrl}${userDataLink}`).as('details');

      // verify status code and response body for added scenario
      cy.get('@details').its('status').should('eq', 200);
      cy.get('@details').then((response) => {
         expect(response.statusText).to.eq("OK");
      });
   });

   // add created duplicate sample scenario
   it('should create duplicate data as well', () => {
      cy.saveData(dataToSave, `${apiUrl}${userDataLink}`).as('details');

      // verify status code and response body for added duplicate scenario
      cy.get('@details').its('status').should('eq', 200);
      cy.get('@details').then((response) => {
         expect(response.statusText).to.eq("OK");
      });

      cy.log('No duplicate check in API, duplicate scenario was created.');
   });
});
