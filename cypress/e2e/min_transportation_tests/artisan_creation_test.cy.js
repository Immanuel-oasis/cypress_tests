describe('LICENSE APPLICATION - ARTISANS', () => {

    const baseUrl = 'http://41.207.248.246:3600/';

    // ==============================
    // 🔑 CONSTANTS
    // ==============================
    const ASIN = {
        individual: '17602288105',
        corporate: '16995905859'
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
    // 1️⃣ APPLICATION FLOW
    // ==============================
    it('1️⃣ Successfully applies for ARTISANS license', () => {

        login(credentials.applicant.email, credentials.applicant.password);

        cy.wait(1000);
        cy.get('[routerlink="/user/license"] > .nav-container > p').click({ force: true });

        cy.get('#licenseType').select('ARTISANS');
        cy.get('button').click({ force: true });

        cy.get('.input').clear().type(ASIN.individual);
        cy.get('.d-flex > button').click({ force: true });

        // Workshop Details
        cy.get('[style="position: relative;"] input', { timeout: 15000 })
            .should('be.visible')
            .type('A');

        cy.get('.ms-0 > :nth-child(2)').click({ force: true });

        cy.get('.ms-mb-10 > .input').select('Category A');

        cy.wait(1000);
        cy.get('.proceed').click({ force: true });

        cy.wait(1000);
        cy.get('.save').click({ force: true });

        cy.log('✅ Application completed successfully');
    });

    // ==============================
    // 2️⃣ PAYMENT FLOW
    // ==============================
    it('2️⃣ Pays for ARTISANS license', () => {

        login(credentials.applicant.email, credentials.applicant.password);

        cy.contains('Licenses').click();

        cy.get('svg[data-bs-toggle="dropdown"]')
            .filter(':visible')
            .first()
            .click({ force: true });

        cy.contains('Make Payment').click({ force: true });

        cy.contains('Pay Online')
            .should('be.visible')
            .click({ force: true });

        cy.log('💳 Payment initiated');

        cy.wait(60000);

        cy.get('.btn').click();
        cy.log('💳 Payment completed');

    });

    // ==============================
    // 3️⃣ REVIEWER
    // ==============================
    it('3️⃣ Submits Artisan\'s recommendation', () => {

        login(credentials.reviewer.email, credentials.reviewer.password);

        cy.contains('License Applications', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get("[data-bs-display = 'dynamic']")
            .first()
            .click({ force: true });

        cy.contains('li', 'View Application', { timeout: 10000 })
            .filter(':visible')
            .first()
            .click();

        cy.contains('button', 'Recommend for Inspection', { timeout: 10000 })
            .filter(':visible')
            .first()
            .click();

        cy.get('.btn-primary')
            .should('be.enabled')
            .click();

        // ✅ FIXED
        cy.get('button[data-bs-dismiss="modal"]')
            .filter(':visible')
            .first()
            .click();

        cy.log('✅ Recommendation completed');
    });

    // ==============================
    // 3️⃣ INSPECTION 
    // ==============================

    it("Inspector checks the submittion from the reviewer", () => {
        login(credentials.inspector.email, credentials.inspector.password);

        cy.get('[routerlink="/admin/license-applications-new"] > .nav-container')
            .click()

        cy.contains("All").click()

        cy.get(':nth-child(1) > .action > .list-item-action-dropdown > .dropdown-toggle')
            .click()

        cy.get(':nth-child(1) > .action > .list-item-action-dropdown > .dropdown-menu > .dropdown-li')
            .click()

        cy.contains("Approve Inspection").should('be.visible').click()

        cy.contains('Yes').click()
    })

    // ==============================
    // 3️⃣  INSPECTION APPROVAL 
    // ==============================

    it('Inspected license gets approved', () => {
        login(credentials.inspector_approver.email, credentials.inspector_approver.password)

        cy.get('[routerlink="/admin/license-applications-new"] > .nav-container').should('be.visible').click()

        cy.contains("All").should('be.visible').click()

        cy.get(':nth-child(1) > .action > .list-item-action-dropdown').should('be.visible').click()

        cy.get(':nth-child(1) > .action > .list-item-action-dropdown > .dropdown-menu > .dropdown-li').should('be.visible').click()

        cy.get('.btn-success').should('be.visible').click()

        cy.contains("Yes").click()
    })

    // ==============================
    // 3️⃣  FINAL APPROVAL
    // ==============================

    it('Artisan license gets approved', () => {
        login(credentials.final_approver.email, credentials.final_approver.password)

        cy.get('[routerlink="/admin/license-applications-new"] > .nav-container').should('be.visible').click()

        cy.get('.list-item-action-dropdown > .dropdown-toggle').should('be.visible').click()

        cy.get('.dropdown-li').click()

        cy.get('.btn-success').click()

        cy.get('.btn-primary').click()
    })
})