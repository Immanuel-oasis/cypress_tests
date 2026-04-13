describe('Jumia website Test', () => {
  it('Search bar should work', () => {
    cy.visit('https://www.jumia.com.ng/')
    cy.get("div[class=footer-default]").contains('Reject Optional Cookies').click()
    // Get an input, type into it
    cy.get("input[type=text]").type('quality shoes for sale in Nigeria')

    //  Verify that the value has been updated
    cy.get("button[class='btn _prim _md -mls -fsh0']").click()
  });

  it("Office Items categories should show items when clicked", () => {
    cy.visit('https://www.jumia.com.ng/')
    cy.get("div[class=footer-default]").contains('Reject Optional Cookies').click()
    cy.get('label[for=\'dpdw-login\'] svg[width=\'18\']').click();
  })
})