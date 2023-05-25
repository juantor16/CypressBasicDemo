describe("API test", () => {
  it("should call public APIs endpoint and verify data", () => {

    // make get request to the provided api
    cy.request("https://api.publicapis.org/entries").then((response) => {
      
    // expect response status to be 200
      expect(response.status).to.eq(200);
      
      // expect response body to have property 'entries'
      expect(response.body).to.have.property("entries");

      // create new constant with entries whose category is equal to Authentication & Authorization
      const authEntries = response.body.entries.filter(
        (entry) => entry.Category === "Authentication & Authorization"
      );

      // print the found entries
      cy.log('Entries stored: ' + JSON.stringify(authEntries, null, 2));
      console.log('Entries stored: ' + JSON.stringify(authEntries, null, 2));

      // verify count
      expect(authEntries.length).to.eq(7);
    });
  });
});
