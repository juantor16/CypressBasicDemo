describe("Sauce Demo Test", function () {
  it("Verifies items sorting", function () {
    // Visit the Saucedemo website
    cy.visit("https://www.saucedemo.com/");

    // Type username and password, then click login button
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    // Change the sorting to "Name (A to Z)"
    cy.get(".product_sort_container").select("az");

    // Grab all the product names and verify that they are sorted in ascending order
    cy.get(".inventory_item_name").then(($items) => {
      // First, get a plain array from the jQuery array-like object ($items.get()).
      // Then, sort that array in ascending order by the text content of each element.
      // This sorted array is stored in the 'sorted' variable.
      let sorted = $items
        .get()
        .sort((a, b) => (Cypress.$(a).text() > Cypress.$(b).text() ? 1 : -1));
      $items.each((index, element) =>
        // For each item, check whether the text of the item is equal to the text of the corresponding item in the sorted array
        expect(element).to.have.text(sorted[index].textContent)
      );
    });

    // Change the sorting to "Name (Z to A)"
    cy.get(".product_sort_container").select("za");

    // Grab all the product names and verify that they are sorted in descending order
    cy.get(".inventory_item_name").then(($items) => {
      // Similar to before, but this time the array is sorted in descending order
      let sorted = $items
        .get()
        .sort((a, b) => (Cypress.$(a).text() < Cypress.$(b).text() ? 1 : -1));
      $items.each((index, element) =>
        // For each item, check whether the text of the item is equal to the text of the corresponding item in the sorted array
        expect(element).to.have.text(sorted[index].textContent)
      );
    });
  });
});
