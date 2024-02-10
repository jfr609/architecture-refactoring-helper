// Test Name:   A1_EmptyApproaches.cy.js
//
// Description: Query all existing approaches and delete them.
//
// Act:         Query all existing approaches in database [GET]
// Act:         Delete all existing approaches in database [DELETE]
// Assert:      Deletion successful

describe("Empty approach database.", () => {
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
});

