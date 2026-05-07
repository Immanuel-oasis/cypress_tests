describe('konga userflow test', () => {
    beforeEach(() => {
        cy.visit("https://www.konga.com/");

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    });

    // ========================
    // 👤 User details
    // ✉️ email = mmmanuel@mailinator.com
    // 🔒 password = Immanuel@mailinator.com1
    // ========================

    it('signs in user', () => {

        const email = 'mmmanuel@mailinator.com'
        const password = 'Immanuel@mailinator.com1'


        cy.get('[class = "button_button__cpnXl cookieBanner_acceptBtn__VWjfb"]')
            .click({ force: true });

        cy.get('.close-prompt-message-button')
            .click({ force: true })

        cy.get('.nav-bar-fix > a')
            .contains('Login / Signup')
            .click({ force: true });

        cy.get('input#username')
            .should('be.visible')
            .should('be.enabled')
            .clear()
            .type(email);

        cy.get('input#password')
            .should('be.visible')
            .should('be.enabled')
            .clear()
            .type(email)

        cy.contains('Login').click({ force: true });

    })
});