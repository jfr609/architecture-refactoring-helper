// Test Name:   A5_QueryExistingApproach.cy.js
//
// Description: Query existing and non-existing approach by ID. 
//              Prerequisite: Approach with ID=0 does not exist in database.
//              Prerequisite: Approach database is not empty.
//
// Arrange:     Query all existing approaches in database and read first ID
// Act:         Query existing approach by ID [GET]
// Assert:      Response contains correct approach
//
// Act:         Query non-existing approach with ID=0 [GET] 
// Assert:      Response returns status code 404 (Not Found)

describe("Query existing and non-existing approach by ID.", () => {
   const approachListLink = "api/v1/approaches";
   const approachDataLink = (refactoringApproachId) => `api/v1/approaches/${refactoringApproachId}`;
   const apiUrl = Cypress.config('url');

   let firstApproachId;
   let firstIdentifier;

   before(() => {
      // fetch all approaches
      cy.getData(`${apiUrl}${approachListLink}`)
         .its('body')
         .then((body) => {
            // read first approach
            const firstApproach = body[0];
            if (firstApproach) {
               // verify that first approach is valid
               firstApproachId = firstApproach.refactoringApproachId;
               firstIdentifier = firstApproach.identifier;
            } else {
               // first approach is invalid, set default values
               console.error('The first approach is invalid.');
               firstApproachId = 0;
               firstIdentifier = '0';
            }
         });
   });

   it('fetches first approach by ID [GET]', () => {
      cy.getData(`${apiUrl}${approachDataLink(firstApproachId)}`)
         .its('status')
         .should('equal', 200);
   });

   it('verifies first approach [GET]', () => {
      cy.getData(`${apiUrl}${approachDataLink(firstApproachId)}`)
         .its('body')
         .then((body) => {
            cy.log('Response Body:', body);
            expect(body).to.have.property('refactoringApproachId', firstApproachId);
            expect(body).to.have.property('identifier', firstIdentifier);
         });
   });

   it('fetches invalid approach with ID=0 [GET]', () => {
      cy.getData(`${apiUrl}${approachDataLink(0)}`)
         .its('status')
         .should('equal', 404);
   });
});
