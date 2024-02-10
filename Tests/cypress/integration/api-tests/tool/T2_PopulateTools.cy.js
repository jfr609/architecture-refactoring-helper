// Test Name:   T2_PopulateTools.cy.js
//
// Description: Populate tool database with 5 random tools.
//              Step 1: Query all existing tools and delete them
//              Step 2: Add five random tools
//
// Act:         Query all existing tools in database [GET]
// Act:         Delete all existing tools in database [DELETE]
// Assert:      Deletion successful
//
// Arrange:     Create five random tools
// Act:         Add five random tools to database [POST]
// Assert:      Addition successful

describe("Empty tool database and add 5 sample tools.", () => {
   const allToolsLink = "api/v1/tools";
   const apiUrl = Cypress.config('url');

   it('fetches all tools and deletes them [GET, DELETE]', () => {
      // fetch tools
      cy.request('GET', `${apiUrl}${allToolsLink}`)
         .its('body')
         .then((body) => {
            if (body.length > 0) {
               // if the array is not empty, delete each tool
               body.forEach(tool => {
                  const toolId = tool.toolId;
                  // delete tool
                  cy.request('DELETE', `${apiUrl}${allToolsLink}/${toolId}`)
                     .its('status')
                     .should('equal', 204);
               });
            } else {
               // log message indicating that tool database was empty
               cy.log('No tools found, tool database was empty.');
            }
         });
   });

   it('adds 5 sample tools [POST, GET]', () => {
      for (let i = 0; i < 5; i++) {
         // generate a unique identifier by time stamp and random number
         const uniqueIdentifier = Date.now() + Math.floor(Math.random() * 1000);
         const specificData = {
            identifier: `Cypress Test Tool ${uniqueIdentifier}`,
            toolSource: {
               author: `Author ${i}`,
               description: `Description ${i}`,
               link: "https://www.cypress.io",
               name: `Cypress Sample Tool ${i}`,
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

         // add created sample tool
         cy.saveData(specificData, `${apiUrl}${allToolsLink}`).as('details');

         // verify status code and response body for added sample tool
         cy.get('@details').its('status').should('eq', 201);
         cy.get('@details').then((response) => {
            expect(response.statusText).to.eq("Created");
         });
      }
   });
});