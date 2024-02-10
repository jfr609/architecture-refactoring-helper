// Test Name:   A2_PopulateApproaches.cy.js
//
// Description: Populate approach database with 5 random approaches.
//              Step 1: Query all existing approaches and delete them
//              Step 2: Add five random approaches
//
// Act:         Query all existing approaches in database [GET]
// Act:         Delete all existing approaches in database [DELETE]
// Assert:      Deletion successful
//
// Arrange:     Create five random approaches
// Act:         Add five random approaches to database [POST]
// Assert:      Addition successful

describe("Empty approach database and add 5 sample approaches.", () => {
   const allApproachesLink = "api/v1/approaches";
   const apiUrl = Cypress.config('url');

   it('fetches all approaches and deletes them [GET, DELETE]', () => {
      // fetch approaches
      cy.request('GET', `${apiUrl}${allApproachesLink}`)
         .its('body')
         .then((body) => {
            if (body.length > 0) {
               // if the array is not empty, delete each approach
               body.forEach(approach => {
                  const approachId = approach.refactoringApproachId;
                  // delete approach
                  cy.request('DELETE', `${apiUrl}${allApproachesLink}/${approachId}`)
                     .its('status')
                     .should('equal', 204);
               });
            } else {
               // log message indicating that approach database was empty
               cy.log('No approaches found, approach database was empty.');
            }
         });
   });

   it('adds 5 sample approaches [POST, GET]', () => {
      for (let i = 1; i <= 5; i++) {
                 // generate a unique identifier by time stamp and random number
         const uniqueIdentifier = Date.now() + Math.floor(Math.random() * 1000);
         const specificData = {
            identifier: `test ${uniqueIdentifier}`,
            approachSource: {
               authors: 'Cypress Tester',
               link: 'https://www.cypress.io',
               title: `Cypress Sample Approach ${i}`,
               year: 2016 + i
            },
            domainArtifactInputs: [{
                  name: 'Human expertise',
                  description: 'Human expertise'
               },
               {
                  name: 'Documentation',
                  description: 'Documentation Description'
               }
            ],
            runtimeArtifactInputs: [{
               name: 'Log traces',
               description: 'Log traces Description'
            }],
            modelArtifactInputs: [{
                  name: 'Data flow diagram',
                  description: 'Data flow diagram Description'
               },
               {
                  name: 'Activity diagram',
                  description: 'Activity diagram'
               }
            ],
            executableInputs: [{
                  name: 'Source code',
                  language: 'No specification',
                  description: 'Source code'
               },
               {
                  name: 'Database file',
                  language: 'No specification',
                  description: 'Source code'
               }
            ],
            approachOutputs: [],
            representationOutputs: [{
                  name: 'Guideline / Workflow',
                  description: 'Guideline / Workflow'
               },
               {
                  name: 'Source code',
                  description: 'Source code'
               },
               {
                  name: 'List of services',
                  description: 'List of services'
               }
            ],
            approachProcess: {
               analysisTypes: [{
                     name: 'Historic',
                     description: 'Historic'
                  },
                  {
                     name: 'Dynamic',
                     description: 'Dynamic'
                  }
               ],
               atomarUnits: [{
                     name: 'Entity',
                     description: 'Entity'
                  },
                  {
                     name: 'Function',
                     description: 'Function'
                  },
                  {
                     name: 'Business Capability',
                     description: 'Business Capability'
                  }
               ],
               automationLevels: [{
                  name: 'Automatic',
                  description: 'Automatic'
               }],
               directions: [{
                     name: 'Mixed',
                     description: 'Mixed'
                  },
                  {
                     name: 'Bottom-up',
                     description: 'Bottom-up'
                  }
               ],
               processStrategies: [{
                     name: 'Continuous Evolution',
                     description: 'Continuous Evolution'
                  },
                  {
                     name: 'Greenfield',
                     description: 'Greenfield'
                  },
                  {
                     name: 'Extension',
                     description: 'Extension'
                  }
               ],
               qualities: [{
                     name: 'Performance',
                     description: 'Performance',
                     category: 'Attribute'
                  },
                  {
                     name: 'Independence',
                     description: 'Independence',
                     category: 'Attribute'
                  },
                  {
                     name: 'Business',
                     description: 'Business',
                     category: 'Attribute'
                  }
               ],
               qualitySublevels: [{
                     name: 'Agility',
                     qualityName: 'Portability'
                  },
                  {
                     name: 'Accountability',
                     qualityName: 'Security'
                  }
               ],
               techniques: [{
                     name: 'Data-flow driven',
                     description: 'Data-flow driven'
                  },
                  {
                     name: 'Clustering',
                     description: 'Clustering'
                  },
                  {
                     name: 'Custom heuristics',
                     description: 'Custom heuristics'
                  }
               ]
            },
            approachUsability: {
               accuracyPrecision: {
                  name: 'Medium',
                  description: 'Medium'
               },
               noToolSupport: true,
               resultsQuality: undefined,
               toolSupport: undefined,
               validationMethod: {
                  name: 'Case study',
                  description: 'Case study'
               }
            }
         };

         // add created sample approach
         cy.saveData(specificData, `${apiUrl}${allApproachesLink}`).as('details');

         // verify status code and response body for added sample approach
         cy.get('@details').should((response) => {
            expect(response.status).to.eq(201);
            expect(response.statusText).to.eq("Created");
         });
      }
   });
});