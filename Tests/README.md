## Cypress Integration Tests

The folder `cypress` contains 16 integration test cases for the Architecture Refactoring Helper.
They test the functionality provided by the application's backend API for the major use cases.

All tests can be run against a local or remote installation using the [Cypress](https://www.cypress.io/ "Cypress") test automation tool.

### Installation and Preparation

1. Install Cypress [version](https://github.com/cypress-io/cypress/releases "version") 4.11 or newer into a new folder by running `npm install cypress`

2. Copy the files in the folder `cypress` of this repository to your local installation:<br>
   `cypress/integration/api-tests` contains four folders that include all test cases<br>
   `cypress/support` contains additional custom commands, used by the test cases<br>

3. Edit the file `cypress.json` in your Cypress project root folder and specifiy the backend URL of the Architecture Refactoring Helper as follows (adapt IP address and port to your installation):<br>
`{ "url": "http://xxx.xxx.xxx.xxx:5000/" }`

4. Start Cypress from the command line by running `npx cypress open`

5. The test cases are now visible in the Cypress UI and can be executed<br>

### Test Cases

In the following, all test cases are listed.<br>

#### Approach
`A1_EmptyApproaches` queries all existing approaches and deletes them.<br>
`A2_PopulateApproaches` populates the approach database with 5 random approaches.<br>
`A3_DulicateApproach` creates a new and duplicate approach.<br>
`A4_QueryApproaches` queries all existing approaches.<br>
`A5_QueryApproachByID` queries an existing and non-existing approach by ID.<br>

#### Filter
`F1_FilterApproaches` applies a custom filter configuration for approaches.<br>

#### Scenario
`S1_EmptyScenarios` queries all existing scenarios and deletes them.<br>
`S2_CRUDScenario` performs CRUD operations for a scenario.<br>
`S3_DulicateScenario.cy.js` creates a new and a duplicate scenario.<br>
`S4_QueryAllScenarios` queries all existing scenarios.<br>
`S5_QueryScenarioByID` queries an existing and non-existing scenario by ID.<br>

#### Tool
`T1_EmptyTools` queries all existing tools and deletes them.<br>
`T2_PopulateTools` populates the database with 5 random tools.<br>
`T3_DulicateTools` creates a new and duplicate tool.<br>
`T4_QueryTools` queries all existing tools.<br>
`T5_QueryToolByID` queries an existing and non-existing tool by ID.<br>




