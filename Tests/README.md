## Cypress Integration Tests

The folder `cypress` contains 16 integration test cases for the Architecture Refactoring Helper.
They test the API functionality of the backend application for the major application\'s use cases.

All tests can be run against a local or remote installation using the [Cypress](https://www.cypress.io/ "Cypress") test automation tool.

### Installation and Preparation

1. Install Cypress [version](https://github.com/cypress-io/cypress/releases "version") 4.11 or newer into a new folder by running `npm install cypress`

2. Copy the files in the folder `cypress` to your local installation:
   `cypress/integration/api-tests` contains four folders that include all tests
   `cypress/support` contains additional custom commands, used by the tests

3. Edit the file `cypress.json` in your project root folder and specifiy the backend URL of the Architecture Refactoring Helper as follows (adapt url and port): `{ "url": "http://xxx.xxx.xxx.xxx:5000/" }`

4. Start cypress by running `npx cypress open`

5. The test cases are now visible in the Cypress UI and can be executed.

### Test Cases

In the following, all test cases are listed.

#### Approach
`A1_EmptyApproaches` queries all existing approaches and deletes them.
`A2_PopulateApproaches` populates the approach database with 5 random approaches.
`A3_DulicateApproach` creates a new and duplicate approach.
`A4_QueryApproaches` queries all existing approaches.
`A5_QueryApproachByID` queries an existing and non-existing approach by ID.

#### Filter
`F1_FilterApproaches` applies a custom filter configuration for approaches.

#### Scenario
`S1_EmptyScenarios` queries all existing scenarios and deletes them.
`S2_CRUDScenario` performs CRUD operations for a scenario.
`S3_DulicateScenario.cy.js` creates a new and a duplicate scenario.
`S4_QueryAllScenarios` queries all existing scenarios.
`S5_QueryScenarioByID` queries an existing and non-existing scenario by ID.

#### Tool
`T1_EmptyTools` queries all existing tools and deletes them.
`T2_PopulateTools` populates the database with 5 random tools.
`T3_DulicateTools` creates a new and duplicate tool.
`T4_QueryTools` queries all existing tools.
`T5_QueryToolByID` queries an existing and non-existing tool by ID.




