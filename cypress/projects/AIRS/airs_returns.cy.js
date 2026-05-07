describe('Annual Returns filing test', () => {
    // ==================================
    // PAYE EMPLOYEE DATA FLOW TEST FOR ONLY SINGLE EMPLOYEE
    // BATCH EMPLOYEE WASN'T CARRIED OUT IN THIS CODE
    // ===================================

    const TCC = "TCC - 45909239"
    const ASIN = "2041971836"
    const AIRS = "BP2062946838"
    const username = 16435834947
    const password = 16435834947

    // =======================
    // login helper function
    // =======================

    function login(name, password) {
        cy.visit('https://tax.oasisproducts.ng/auth/login');

        cy.get('[type=email]')
            .clear()
            .type(name)

        cy.get('#password')
            .clear()
            .type(password)

        cy.get('[type=submit]')
            .click({ force: true })
    }

    it('files for annual returns', () => {
        login(username, password)

        cy.get('li > .dropdown-toggle')
            .eq(4)
            .click()

        cy.get('.dropdown-menu.show :nth-child(2)')
            .click()

        cy.get('.mt-3 > button')
            .eq(0)
            .click()

        cy.get('.form-control')
            .select(1)

        cy.get('.col-md-12 > button')
            .click()

        cy.get('[placeholder="Enter Registration No"]')
            .clear()
            .type(1221212)

        cy.get('[formcontrolname="companyRegistrationDate"]')
            .type("2026-04-23")

        cy.get(':nth-child(1) > .col-md-6.custom-select > .form-select')
            .select(1)

        cy.get('.col-md-6')
            .eq(1)
            .find(':nth-child(2)')
            .clear()
            .type(12)

        cy.get('.col-md-6')
            .eq(2)
            .find(':nth-child(2)')
            .clear()
            .type(12)

        cy.get(':nth-child(2) > .form-select')
            .select(1)

        cy.get(':nth-child(3) > .form-select')
            .select(1)

        // CONTACT PERSON INFORMATION
        cy.get('.input-group > .form-control')
            .clear()
            .type('immanuel@mailinator.com')

        cy.get('.col-md-4')
            .eq(6)
            .find(':nth-child(2)')
            .click({ multiple: true })

        cy.get('.content > :nth-child(1) > :nth-child(2) > .form-control')
            .clear()
            .type("CSZMER")

        cy.wait(2000)

        cy.get('.content > :nth-child(2) > :nth-child(1) > .form-control')
            .clear()
            .type('Valid Name')

        cy.get('.content > :nth-child(2) > :nth-child(2) > .form-control')
            .clear()
            .type("09134532132")

        cy.get('.content > :nth-child(2) > :nth-child(3) > .form-control')
            .clear()
            .type('valid destination')

        cy.get(':nth-child(3) > .col-md-6 > .form-control')
            .clear()
            .type('valid address')

        cy.get('.d-flex > .btn')
            .click()

        // AREA SELECTION
        cy.get(':nth-child(4) > .form-select')
            .select(1)

        cy.get('.d-flex > .btn')
            .click()

        // STEP 2
        cy.get('[type=file]')
            .eq(0)
            .selectFile('cypress/downloads/E_FILING_FORM_H1_FILING.xlsx', { force: true })

        cy.wait(9000)

        cy.get('[type=file]')
            .eq(1)
            .selectFile('cypress/downloads/E_FILING_SALARY_PROJECTION.xlsx', { force: true })

        cy.wait(9000)

        cy.get('[type=file]')
            .eq(2)
            .selectFile('cypress/downloads/WHT_Schedule.xlsx', { force: true })

        cy.wait(9000)

        cy.get('[type=file]')
            .eq(3)
            .selectFile('cypress/downloads/E_FILING_SALARY_PROJECTION.xlsx', { force: true })

    })
})