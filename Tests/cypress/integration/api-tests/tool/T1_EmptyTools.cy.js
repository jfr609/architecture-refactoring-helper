// Test Name:   T1_EmptyTools.cy.js
//
// Description: Query all existing tools and delete them.
//
// Act:         Query all existing tools in database [GET]
// Act:         Delete all existing tools in database [DELETE]
// Assert:      Deletion successful

describe("Empty tool database.", () => {
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
});