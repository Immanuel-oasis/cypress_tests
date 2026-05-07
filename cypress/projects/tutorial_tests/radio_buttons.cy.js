describe('Radio button functionality', () => {
    // ========================
    // Radio button selection in cypress
    // ========================
    it('check boxes and radio buttons', () => {
        cy.visit('https://www.zoho.com/au/books/accounting-software-demo/#/reports', { headers: { "Accept-Encoding": "gzip, deflate" } })

        cy.get('.btn.btn-link[data-test-title="configure-layout"]').click()
    });

});