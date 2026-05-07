describe('Motor vehicle dealer license test', () => {
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

    it('Applies for Motor Cycle License successfully', () => {
        login(credentials.applicant.email, credentials.applicant.password)

        cy.intercept('http://41.207.248.246:8002/v1/api/auth/login').as('dashboard')

        cy.wait('@dashboard')

        cy.get('[routerlink="/user/license"] > .nav-container')
            .should('be.visible')
            .click({ force: true })

        cy.get('#licenseType')
            .should('be.enabled')
            .select(2)

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

        // COMPANY DETAILS
        cy.get('#enter')
            .should('be.enabled')
            .type(ASIN.corporate)

        cy.get('.button')
            .click({ force: true })

        cy.get(':nth-child(4) > .input')
            .select('Aguata')

        cy.get(':nth-child(5) > .input')
            .should('be.enabled')
            .select(1)

        cy.get('#cdNatureOfBusiness')
            .should('be.enabled')
            .select(1)

        cy.get('.ng-input > input')
            .clear()
            .type('ACURA')

        cy.contains('ACURA')
            .should('exist')
            .click({ force: true })

        cy.get('#cdSourceOfPurchase')
            .select(1)

        // BRANCH OFFICE
        cy.get('div.ng-pristine > .row > :nth-child(2) > .input')
            .should('exist')
            .select(1)

        cy.get('.ng-invalid.ng-dirty > .row > :nth-child(3) > .input')
            .should('be.enabled')
            .select(1)


        // CONTACT PERSON
        cy.get('.mt-4 > .row > :nth-child(1) > .input')
            .should('be.enabled')
            .clear()
            .type('asssa aass aassas')

        cy.get('.mt-4 > .row > :nth-child(2) > .input')
            .should('be.enabled')
            .select(1)

        cy.get('.mt-4 > .row > :nth-child(3) > .input')
            .should('be.enabled')
            .type('9024335678')

        cy.get('.add-btn').click({ force: true })

        cy.get('.proceed')
            .click()

        cy.get('.save').click({ force: true })
    })
})