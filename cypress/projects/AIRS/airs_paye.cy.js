describe('AIRS Paye payment data flow', () => {
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

    // ========================
    // CREATE NEW EMPLOYEES
    // ========================
    it('Adds new employees', () => {
        login(username, password)

        cy.get('li > .dropdown-toggle')
            .eq(3)
            .click()

        cy.get('.dropdown-menu.show :nth-child(1)')
            .click()

        cy.get('.dropdown > button')
            .last()
            .click()

        cy.get('.dropdown-menu.show > .dropdown-item')
            .eq(0)
            .click()

        cy.get('#asin')
            .clear()
            .type(ASIN)

        cy.get('.col-md-4 > button')
            .click()

        // FILL FORM
        cy.get('.col-md-4.mb-2')
            .eq(6)
            .clear()
            .type("12355")

        cy.get('.col-md-4.mb-2')
            .eq(7)
            .find('select')
            .select(1)

        cy.get('.col-md-4.mb-2')
            .eq(8)
            .clear()
            .type(10000)

        cy.get('.col-md-4.mb-2')
            .eq(9)
            .clear()
            .type(12355)

        cy.get('.col-md-4.mb-2')
            .eq(10)
            .clear()
            .type(10000)

        cy.get('.col-md-4.mb-2')
            .eq(11)
            .clear()
            .type(10000)

        cy.get('.col-md-4.mb-2')
            .eq(12)
            .clear()
            .type(10000)

        cy.get('.col-md-4.mb-2')
            .eq(13)
            .clear()
            .type(10000)

        cy.get('.ng-select-container')
            .click({ force: true })

        cy.get('[role=option]')
            .first()
            .click()

        cy.get('[role=option]')
            .last()
            .click()

        cy.get('.mb > .col-md-4 > label')
            .click({ force: true })

        cy.get('.col-md-6 > .btn')
            .click()
    });

    // ========================
    // EDIT EMPLOYEE PROFILE TEST
    // ========================

    it('Edits created Employee details', () => {
        login(username, password)

        cy.get('li > .dropdown-toggle')
            .eq(3)
            .click()

        cy.get('.dropdown-menu.show :nth-child(1)')
            .click()


        // clicks available actions
        cy.get('.dropdown > #dropdownBasic1')
            .click()

        cy.get('.dropdown-menu-flat.show :nth-child(1)')
            .click()

        cy.get('.row.mb-1 >.col-md-4')
            .eq(13)
            .find(':nth-child(2)')
            .clear()
            .type(10000)

        cy.get('.row.mb-1 >.col-md-4')
            .eq(14)
            .find(':nth-child(2)')
            .clear()
            .type(10000)

        cy.get('.row.mb-1 >.col-md-4')
            .eq(15)
            .find(':nth-child(2)')
            .clear()
            .type(10000)
        cy.get('.row.mb-1 >.col-md-4')
            .eq(16)
            .find(':nth-child(2)')
            .clear()
            .type(10000)

        cy.get('.row.mb-1 >.col-md-4')
            .eq(17)
            .find(':nth-child(2)')
            .clear()
            .type(10000)

        cy.get('.row.mb-1 >.col-md-4')
            .eq(18)
            .find(':nth-child(2)')
            .clear()
            .type(10000)

        cy.get('.modal-footer > .btn')
            .click()

        cy.get('.btn-primary')
            .click()

        cy.get('.my-3 > button')
            .click()
    });

    // ===========================
    // PREVIEW EMPLOYEE PROFILE DATA TEST
    // ===========================

    it('Previews PAYE details', () => {
        login(username, password)

        cy.get('li > .dropdown-toggle')
            .eq(3)
            .click()

        cy.get('.dropdown-menu.show :nth-child(1)')
            .click()

        // clicks available actions
        cy.get('.dropdown > #dropdownBasic1')
            .click()

        cy.get('.dropdown-menu-flat.show :nth-child(2)')
            .click()

        cy.wait(10000)

        cy.get('.modal-footer > .btn')
            .click()
    });

    // ==========================
    // EMPLOYEE PROFILE DEACTIVATION TEST
    // ==========================
    it('Deactives Employee PAYE', () => {
        login(username, password)

        cy.get('li > .dropdown-toggle')
            .eq(3)
            .click()

        cy.get('.dropdown-menu.show :nth-child(1)')
            .click()

        // clicks available actions
        cy.get('.dropdown > #dropdownBasic1')
            .click()

        cy.get('.dropdown-menu-flat.show :nth-child(3)')
            .click()

        cy.get('.btn-primary')
            .click()

        cy.get('.my-3 > .btn')
            .click()
    });
});