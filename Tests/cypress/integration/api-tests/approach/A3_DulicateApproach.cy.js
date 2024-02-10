// Test Name:   A3_DulicateApproach.cy.js
//
// Description: Create a new and duplicate approach in the database.
//              Step 1: Create a new random sample approach in the database
//              Step 2: Verify successful creation of approach
//              Step 3: Try to create a duplicate approach in the database
//              Step 4: Verify rejection of creating a duplicate approach
//
// Arrange:     Create random approach
// Act:         Add random approaches to database [POST]
// Assert:      Addition successful
//
// Act:         Add duplicate approach to database [POST]
// Assert:      Addition unsuccessful

describe('Create new and duplicate approach in database.', () => {
   const userDataLink = "api/v1/approaches";
   const apiUrl = Cypress.config('url');

   // generate a unique identifier by time stamp and random number
   const uniqueIdentifier = Date.now() + Math.floor(Math.random() * 1000);

   const dataToSave = {
      identifier: `Cypress Test Approach ${uniqueIdentifier}`,
      approachSource: {
         authors: 'Cypress Tester',
         link: 'https://www.cypress.io',
         title: `Cypress Sample Approach ${uniqueIdentifier}`,
         year: 2023
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

   // keep author name for verification
   const authorName = dataToSave.approachSource.authors;

   // add created sample approach
   it('saves approach in database [POST]', () => {
      cy.saveData(dataToSave, `${apiUrl}${userDataLink}`).as('details');

      // verify status code and response body for added sample approach
      cy.get('@details').its('status').should('eq', 201)
      cy.get('@details').then((response) => {
         expect(response.body.approachSource.authors).to.eq(authorName)
         expect(response.statusText).to.eq("Created")
      });
   });

   // add duplicate sample approach
   it('tries to save duplicate approach in database [POST]', () => {
      cy.saveData(dataToSave, `${apiUrl}${userDataLink}`).as('details');

      // verify status code and response body for added duplicate approach
      cy.get('@details').its('status').should('eq', 409)
      cy.get('@details').then((response) => {
         // verify response body's returned error message
         expect(response.body).to.include("A refactoring approach with the title");
         expect(response.body).to.include("already exists.");
      });
   });
});