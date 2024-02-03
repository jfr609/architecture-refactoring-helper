// Test Name:   T4_CreateNewAndDulicateTool.cy.js
//
// Description: Create a new and duplicate tool in the database.
//              Step 1: Create a new random sample tool in the database
//              Step 2: Verify successful creation of tool
//              Step 3: Try to create a duplicate tool in the database
//              Step 4: Verify rejection of creating a duplicate tool
//
// Arrange:     Create random tool
// Act:         Add random tool to database [POST]
// Assert:      Addition successful
//
// Act:         Add duplicate tool to database [POST]
// Assert:      Addition unsuccessful

describe('Create new and duplicate tool in database.', () => {
   const userDataLink = "api/v1/tools";
   const apiUrl = Cypress.config('url');

   // generate a unique identifier by time stamp and random number
   const uniqueIdentifier = Date.now() + Math.floor(Math.random() * 1000);

   const dataToSave = {
      identifier: `Cypress Test Tool ${uniqueIdentifier}`,
      toolSource: {
         author: "Cypress Tester",
         description: "Cypress Tool Description",
         link: "https://www.cypress.io",
         name: `Cypress Test Tool ${uniqueIdentifier}`,
      },
      toolTypes: [{
            description: "Open Source",
            name: "Open Source",
         },
         {
            description: "Other",
            name: "Other",
         },
         {
            description: "Dynamic Analysis",
            name: "Dynamic Analysis",
         },
      ],
   };

   // keep author name for verification
   const authorName = dataToSave.toolSource.author;

   // add created sample tool
   it('saves tool in database [POST]', () => {
      cy.saveData(dataToSave, `${apiUrl}${userDataLink}`).as('details');

      // verify status code and response body for added sample tool
      cy.get('@details').its('status').should('eq', 201)
      cy.get('@details').then((response) => {
         expect(response.body.toolSource.author).to.eq(authorName)
         expect(response.statusText).to.eq("Created")
      });
   });

   // add duplicate sample tool
   it('tries to save duplicate tool in database [POST]', () => {
      cy.saveData(dataToSave, `${apiUrl}${userDataLink}`).as('details');

      // verify status code and response body for added duplicate tool
      cy.get('@details').its('status').should('eq', 409)
      cy.get('@details').then((response) => {
         // verify response body's returned error message
         expect(response.body).to.include("A tool with the title");
         expect(response.body).to.include("already exists.");
      });
   });
});