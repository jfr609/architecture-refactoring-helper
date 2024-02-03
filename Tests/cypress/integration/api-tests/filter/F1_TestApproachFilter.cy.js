// Test Name:   F1_TestApproachFilter.cy.js
//
// Description: Test the approach filter with a custom filter configuration.
//              Prerequisite: Approach database is not empty.
//
// Arrange:     Create a custom filter configuration
// Act:         Run approach filter request [POST, GET]
// Assert:      Response contains valid filter results

describe("Test the approach filter with a custom filter configuration", () => {
   const recommendationData = "api/v1/approaches/recommendations";
   const apiUrl = Cypress.config('url');

   it('issues a customer filter configuration request [POST, GET]', () => {
      const approachRecommendationRequest = {
         accuracyPrecisionInformation: [{
               attribute: {
                  name: 'High',
                  description: 'High Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Medium',
                  description: 'Medium Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Low',
                  description: 'Low Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Not available',
                  description: 'Not available Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         analysisTypeInformation: [{
               attribute: {
                  name: 'Dynamic',
                  description: 'Dynamic Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Historic',
                  description: 'Historic Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Lexical',
                  description: 'Lexical Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Static',
                  description: 'Static Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         architectureInformation: [{
               attribute: {
                  name: 'Microservices',
                  description: 'Microservices Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Services',
                  description: 'Services Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         atomarUnitInformation: [{
               attribute: {
                  name: 'Business Capability',
                  description: 'Business Capability Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Entity',
                  description: 'Entity Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Function',
                  description: 'Function Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Functionality',
                  description: 'Functionality Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Interface',
                  description: 'Interface Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Other',
                  description: 'Other Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         automationLevelInformation: [{
               attribute: {
                  name: 'Automatic',
                  description: 'Automatic Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Manual',
                  description: 'Manual Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Semi-automatic',
                  description: 'Semi-automatic Description'
               },
               recommendationSuitability: 'Exclude'
            }
         ],
         directionInformation: [{
               attribute: {
                  name: 'Bottom-up',
                  description: 'Bottom-up Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Mixed',
                  description: 'Mixed Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Top-down',
                  description: 'Top-down Description'
               },
               recommendationSuitability: 'Include'
            }
         ],
         domainArtifactInformation: [{
               attribute: {
                  name: 'Documentation',
                  description: 'Documentation Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Human expertise',
                  description: 'Human expertise Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Ontology',
                  description: 'Ontology Description'
               },
               recommendationSuitability: 'Exclude'
            }
         ],
         executableInformation: [{
               attribute: {
                  name: 'Database file',
                  language: 'No specification',
                  description: 'Database file Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Source code',
                  language: 'No specification',
                  description: 'Source code Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Test cases',
                  language: 'No specification',
                  description: 'est cases Description'
               },
               recommendationSuitability: 'Exclude'
            }
         ],
         modelArtifactInformation: [{
               attribute: {
                  name: 'Activity diagram',
                  description: 'Activity diagram Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Business process model',
                  description: 'Business process model Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Data flow diagram',
                  description: 'Data flow diagram Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'State machine diagram',
                  description: 'State machine diagram Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Use case model',
                  description: 'Use case model Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         processStrategyInformation: [{
               attribute: {
                  name: 'Continuous Evolution',
                  description: 'Continuous Evolution Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Extension',
                  description: 'Extension Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Greenfield',
                  description: 'Greenfield Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Refactor',
                  description: 'Refactor Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Rewrite / Rebuild',
                  description: 'Rewrite / Rebuild Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Strangler',
                  description: 'Strangler Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         qualityInformation: [{
               attribute: {
                  name: 'Business',
                  description: '',
                  category: 'Attribute',
                  qualitySublevels: [{
                        name: 'Execution Cost',
                        qualityName: 'Business'
                     },
                     {
                        name: 'Organizational Alignment',
                        qualityName: 'Business'
                     }
                  ]
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Compatibility',
                  description: '',
                  category: 'Attribute',
                  qualitySublevels: [{
                        name: 'Interoperability',
                        qualityName: 'Compatibility'
                     },
                     {
                        name: 'Co-Existence',
                        qualityName: 'Compatibility'
                     }
                  ]
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Independence',
                  description: '',
                  category: 'Attribute',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Maintainability',
                  description: '',
                  category: 'Attribute',
                  qualitySublevels: [{
                        name: 'Analysability',
                        qualityName: 'Maintainability'
                     },
                     {
                        name: 'Manageability',
                        qualityName: 'Maintainability'
                     },
                     {
                        name: 'Modifiability',
                        qualityName: 'Maintainability'
                     },
                     {
                        name: 'Modularity',
                        qualityName: 'Maintainability'
                     },
                     {
                        name: 'Monitorability',
                        qualityName: 'Maintainability'
                     },
                     {
                        name: 'Reusability',
                        qualityName: 'Maintainability'
                     },
                     {
                        name: 'Testability',
                        qualityName: 'Maintainability'
                     },
                     {
                        name: 'Understandability',
                        qualityName: 'Maintainability'
                     }
                  ]
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Performance',
                  description: '',
                  category: 'Attribute',
                  qualitySublevels: [{
                        name: 'Resource Utilization',
                        qualityName: 'Performance'
                     },
                     {
                        name: 'Time Behavior',
                        qualityName: 'Performance'
                     }
                  ]
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Portability',
                  description: '',
                  category: 'Attribute',
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
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Reliability',
                  description: '',
                  category: 'Attribute',
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
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Scalability',
                  description: '',
                  category: 'Attribute',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Security',
                  description: '',
                  category: 'Attribute',
                  qualitySublevels: [{
                        name: 'Accountability',
                        qualityName: 'Security'
                     },
                     {
                        name: 'Authenticity',
                        qualityName: 'Security'
                     },
                     {
                        name: 'Confidentiality',
                        qualityName: 'Security'
                     },
                     {
                        name: 'Integrity',
                        qualityName: 'Security'
                     }
                  ]
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Autonomy',
                  description: '',
                  category: 'SystemProperty',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Cohesion',
                  description: '',
                  category: 'SystemProperty',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Complexity',
                  description: '',
                  category: 'SystemProperty',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Coupling',
                  description: '',
                  category: 'SystemProperty',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Granularity',
                  description: '',
                  category: 'SystemProperty',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Isolation',
                  description: '',
                  category: 'SystemProperty',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Technology Heterogeneity',
                  description: '',
                  category: 'SystemProperty',
                  qualitySublevels: []
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         qualitySublevelInformation: [{
               attribute: {
                  name: 'Accountability',
                  qualityName: 'Security'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Adaptability',
                  qualityName: 'Portability'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Agility',
                  qualityName: 'Portability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Analysability',
                  qualityName: 'Maintainability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Authenticity',
                  qualityName: 'Security'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Availability',
                  qualityName: 'Reliability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Co-Existence',
                  qualityName: 'Compatibility'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Confidentiality',
                  qualityName: 'Security'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Deployability',
                  qualityName: 'Portability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Execution Cost',
                  qualityName: 'Business'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Fault Tolerance',
                  qualityName: 'Reliability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Installability',
                  qualityName: 'Portability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Integrity',
                  qualityName: 'Security'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Interoperability',
                  qualityName: 'Compatibility'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Manageability',
                  qualityName: 'Maintainability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Modifiability',
                  qualityName: 'Maintainability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Modularity',
                  qualityName: 'Maintainability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Monitorability',
                  qualityName: 'Maintainability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Organizational Alignment',
                  qualityName: 'Business'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Recoverability',
                  qualityName: 'Reliability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Replaceability',
                  qualityName: 'Portability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Resource Utilization',
                  qualityName: 'Performance'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Reusability',
                  qualityName: 'Maintainability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Testability',
                  qualityName: 'Maintainability'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Time Behavior',
                  qualityName: 'Performance'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Understandability',
                  qualityName: 'Maintainability'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         representationInformation: [{
               attribute: {
                  name: 'Guideline / Workflow',
                  description: 'Guideline / Workflow Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'List of services',
                  description: 'List of services Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Source code',
                  description: 'Source code Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Splitting recommendations',
                  description: 'Splitting recommendations Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         resultsQualityInformation: [{
               attribute: {
                  name: 'High',
                  description: 'High Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Medium',
                  description: 'Medium Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Low',
                  description: 'Low Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Not available',
                  description: 'Not available Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         runtimeArtifactInformation: [{
               attribute: {
                  name: 'Log traces',
                  description: 'Log traces Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'User-Application interactions',
                  description: 'User-Application interactions Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         serviceTypeInformation: [{
               attribute: {
                  name: 'Application services',
                  description: 'Application services Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Business services',
                  description: 'Business services Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Enterprise services',
                  description: 'Enterprise services Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Entity services',
                  description: 'Entity services Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Infrastructure services',
                  description: 'Infrastructure services Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'No specification',
                  description: 'No specification Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Utility services',
                  description: 'Utility services Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         techniqueInformation: [{
               attribute: {
                  name: 'Clustering',
                  description: 'Clustering Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Custom heuristics',
                  description: 'Custom heuristics Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Data-flow driven',
                  description: 'Data-flow driven Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Domain-Driven Design',
                  description: 'Domain-Driven Design Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Execution-trace modeling',
                  description: 'Execution-trace modeling Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'General guidelines',
                  description: 'General guidelines Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Genetic algorithm',
                  description: 'Genetic algorithm Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Graph-based',
                  description: 'Graph-based Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Performance modeling',
                  description: 'Performance modeling Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Scenario analysis',
                  description: 'Scenario analysis Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Wrapping / Black Box',
                  description: 'Wrapping / Black Box Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         toolSupportInformation: [{
               attribute: {
                  name: 'Industry ready',
                  description: 'Industry ready Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Open source',
                  description: 'Open source Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Prototype',
                  description: 'Prototype Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'No tool support',
                  description: 'No tool support Description'
               },
               recommendationSuitability: 'Exclude'
            }
         ],
         toolTypeInformation: [{
               attribute: {
                  name: 'Decomposition',
                  description: 'Decomposition Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Dynamic Analysis',
                  description: 'Dynamic Analysis Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Open Source',
                  description: 'Open Source Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Other',
                  description: 'Other Description'
               },
               recommendationSuitability: 'Neutral'
            },
            {
               attribute: {
                  name: 'Static Analysis',
                  description: 'Static Analysis Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ],
         validationMethodInformation: [{
               attribute: {
                  name: 'Case study',
                  description: 'Case study Description'
               },
               recommendationSuitability: 'Include'
            },
            {
               attribute: {
                  name: 'Experiment',
                  description: 'Experiment Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'Industry',
                  description: 'Industry Description'
               },
               recommendationSuitability: 'Exclude'
            },
            {
               attribute: {
                  name: 'No validation',
                  description: 'No validation Description'
               },
               recommendationSuitability: 'Neutral'
            }
         ]
      };

      // issue custom filter configuration
      cy.saveData(approachRecommendationRequest, `${apiUrl}${recommendationData}`).as('details');

      // verify status code and response body for recommendation result
      cy.get('@details').its('status').should('eq', 200);
      cy.get('@details').then((response) => {
         expect(response.body).to.be.an('array');

         if (response.body.length > 0) {
            // if array is not empty, verify properties of each recommendation
            response.body.forEach(recommendations => {
               expect(recommendations).to.have.property('matchesCount');
               expect(recommendations).to.have.property('totalScore');
               expect(recommendations).to.have.property('weightedScore');
            });
         } else {
            // verify array size   
            assert.strictEqual(response.body.length, 0, 'The response array should be empty.');

            // if response array is empty, log a message
            cy.log('No recommendations returned, approach database is empty.');
         }
      });
   });
});