// Test Name:   T5_QueryExistingTool.cy.js
//
// Description: Query existing and non-existing tool by ID.     
//              Prerequisite: Tool with ID=0 does not exist in database.
//              Prerequisite: Tool database is not empty.
//
// Arrange:     Query all existing tool in database and read first ID
// Act:         Query existing tool by ID [GET]
// Assert:      Response contains correct tool
//
// Act:         Query non-existing tool with ID=0 [GET] 
// Assert:      Response returns status code 404 (Not Found)

describe("Query existing and non-existing tool by ID.", () => {
   const toolListLink = "api/v1/tools";
   const toolDataLink = (toolId) => `api/v1/tools/${toolId}`;
   const apiUrl = Cypress.config('url');

   let firstToolId;
   let firstIdentifier;

   before(() => {
      // fetch all tools
      cy.getData(`${apiUrl}${toolListLink}`)
         .its('body')
         .then((body) => {
            // read first tool
            const firstTool = body[0];
            if (firstTool) {
               // verify that first tool is valid
               firstToolId = firstTool.toolId;
               firstIdentifier = firstTool.identifier;
            } else {
               // first tool is invalid, set default values
               console.error('The first tool is invalid.');
               firstToolId = 0;
               firstIdentifier = '0';
            }
         });
   });

   it('fetches first tool by ID [GET]', () => {
      cy.getData(`${apiUrl}${toolDataLink(firstToolId)}`)
         .its('status')
         .should('equal', 200);
   });

   it('verifies first tool [GET]', () => {
      cy.getData(`${apiUrl}${toolDataLink(firstToolId)}`)
         .its('body')
         .then((body) => {
            cy.log('Response Body:', body);
            expect(body).to.have.property('toolId', firstToolId);
            expect(body).to.have.property('identifier', firstIdentifier);
         });
   });

   it('fetches invalid tool with ID=0 [GET]', () => {
      cy.getData(`${apiUrl}${toolDataLink(0)}`)
         .its('status')
         .should('equal', 404);
   });
});

