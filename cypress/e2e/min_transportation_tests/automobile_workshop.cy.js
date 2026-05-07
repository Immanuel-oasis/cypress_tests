describe("Min Transportation Automobile Workshop license flow", () => {
    const baseUrl = 'http://41.207.248.246:3600/';

    // ==============================
    // 🔑 CONSTANTS
    // ==============================
    const ASIN = {
        individual: '17602288105',
        corporate: '16034232303'
    };

    const credentials = {
        applicant: { email: 'mndueso@oasismgt.net', password: '*Mndueso3' },
        reviewer: { email: 'tukur@mailinator.com', password: 'password' },
        inspector: { email: 'almustaphatukur111@gmail.com', password: 'password' },
        inspector_approver: { email: 'umar@mailinator.com', password: 'password' },
        final_approver: { email: 'nesta@mailinator.com', password: 'password' },
        admin: { email: 'admin@oasismgt.net', password: 'P@ssw0rd!' }
    };

    // ==============================
    // 🔐 LOGIN HELPER
    // ==============================
    const login = (email, password) => {
        cy.visit(baseUrl);
        cy.log('🔑 Logging into system');

        cy.contains('Login').click();

        cy.get('#Email-ASIN', { timeout: 15000 })
            .should('be.visible')
            .clear()
            .type(email);

        cy.get('#login-password')
            .should('be.visible')
            .clear()
            .type(password, { log: false });

        cy.contains(" Login ").click();

        cy.log('✅ Login submitted');
    };

    // ==============================
    // Automobile License creation
    // ==============================

    it('Successfully Applies for Automobile License', () => {
        login(credentials.applicant.email, credentials.applicant.password)

        cy.get('[routerlink="/user/license"] > .nav-container')
            .should('be.visible')
            .click({ force: true })

        cy.get('#licenseType')
            .should('be.enabled')
            .select('AUTOMOBILE WORKSHOP')

        cy.get('button')
            .should('be.visible')
            .click({ force: true })

        cy.get('.input')
            .should('be.enabled')
            .clear()
            .type(ASIN.individual)

        cy.get('.d-flex > button')
            .should('be.visible')
            .click({ force: true })

        // ENTER BUSINESS DETAILS
        cy.get('.asin-inline-group > .input')
            .should('be.enabled')
            .clear()
            .type(ASIN.corporate)

        cy.get('.asin-inline-group > .button')
            .should('be.enabled')
            .click({ force: true })

        cy.get('.row.mb-2 > :nth-child(2) > .input')
            .should('be.enabled')
            .clear()
            .type("100000")

        cy.get('#accountType')
            .should('be.enabled')
            .select('Ogbaru')

        cy.get('form.ng-invalid > :nth-child(2) > :nth-child(2) > .input')
            .should('be.enabled')
            .select('ATANI')

        cy.get('.ng-invalid.ng-touched > :nth-child(2) > :nth-child(3) > .input')
            .should('be.enabled')
            .clear()
            .type("Plot 234, opp dwam spv street")

        cy.get('[style="position: relative;"] > .input')
            .click({ force: true })

        cy.get('.dot-panel > .d-flex > :nth-child(5) > input').click({ force: true })

        cy.get('[style="position: relative;"] > .input')
            .click({ force: true })

        cy.get(':nth-child(2) > :nth-child(5) > .input')
            .should('be.enabled')
            .clear()
            .type("So and so services")

        cy.get(':nth-child(2) > :nth-child(6) > .input')
            .select(1)

        //EMPLOYEE DETAILS SELECTION
        cy.get('#enter-asin')
            .should('be.enabled')
            .clear()
            .type(ASIN.individual)

        cy.get('.row-column > .button')
            .should('be.visible')
            .click({ force: true })

        cy.get('.form-container > :nth-child(2) > :nth-child(3) > .input')
            .select(1)

        cy.get('.add-btn')
            .should('be.enabled')
            .click({ force: true })

        //CONTACT PERSON
        cy.get('[style="margin-top: 1.5rem;"] > form.ng-pristine > .row > :nth-child(1) > .input')
            .should('be.enabled')
            .clear()
            .type("James Thomson")

        cy.get('select[formcontrolname=lastName]')
            .select(1)

        cy.get('[style="margin-top: 1.5rem;"] > .ng-invalid.ng-dirty > .row > :nth-child(3) > .input')
            .type("09009090909")

        // CLICK PROCEED
        cy.get('.proceed').click({ force: true })

        cy.wait(2000)

        cy.get('.save').click({ force: true })
    });


    // // REVIEWER RECIEVES APPLICANT LICENSE
    // it('Reviewer recieves applicant license', () => {

    // });
});