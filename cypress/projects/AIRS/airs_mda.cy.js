describe('AIRS MDA test', () => {
    // ==================================
    // TESTS ASSESSMENTS FLOW IN THE MDA SECTION OF A_IRS
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

    it('creates MDA assessment', () => {
        login(username, password)

        cy.get('#navbarDropdown10')
            .click()

        cy.get('[href="/user/mda-services"]')
            .should('be.visible')
            .click({ force: true })

        cy.get('.btn')
            .click()

        cy.get('[class="ng-arrow-wrapper"]')
            .click({ force: true })

        cy.get('.ng-option')
            .should('be.visible')
            .eq(1)
            .click({ force: true })

        cy.get('[formcontrolname="mda"]')
            .select(1)

        cy.get('[formcontrolname="paymentPeriod"]')
            .clear()
            .type('2026')

        cy.get('[placeholder="Enter Amount"]')
            .first()
            .clear()
            .type(10000)

        cy.get('[formcontrolname="transactionDescription"]')
            .clear()
            .type('This is a valid description of the transaction')

        cy.get('[type="file"]')
            .selectFile('cypress/files/Software testing tutorial.txt')

        cy.get('.btn-success[style*="width: 100%;"]')
            .click()

        cy.get('.col-md-6 > .btn-success')
            .click()
    });

    // =============================
    // OPENS USERS MDA PROFILE
    // WAITS 5 SECS 
    // AND CLOSES IT
    // =============================

    it('Views registered MDA Assessment profile', () => {
        login(username, password)

        cy.get('#navbarDropdown10')
            .click()

        cy.get('[href="/user/mda-services"]')
            .should('be.visible')
            .click({ force: true })

        cy.get('#dropdownBasic1')
            .first()
            .should('be.visible')
            .click()

        cy.get(' .dropdown-item-flat')
            .filter(':visible')
            .first()
            .click()

        cy.wait(5000)

        cy.get('[stroke-width="2.16781"]')
            .click({ force: true })
    });

    // ============================
    // Successfully pays for MDA Assessments
    // ============================

    it('Successfully pays for MDA Assessments', () => {
        login(username, password)

        cy.get('#navbarDropdown10')
            .click()

        cy.get('[href="/user/mda-services"]')
            .should('be.visible')
            .click({ force: true })

        cy.get('#dropdownBasic1')
            .first()
            .should('be.visible')
            .click()

        cy.get(' .dropdown-item-flat')
            .filter(':visible')
            .eq(2)
            .click()

        cy.get('#interswitch')
            .click()

        //====================
        //CARD DETAILS
        //>> Verve	
        //>>5061050254756707864	 
        // EXP>>06/26	
        // CVV>>111	PIN>>1111 OTP>>123456
        //====================
        cy.wait(70000)

        cy.get('div.button-section > button')
            .click()
    });

    it.only('Opens manual records for Assessments', () => {
        login(username, password)

        cy.get('#navbarDropdown10')
            .click()

        cy.get('[href="/user/mda-services"]')
            .should('be.visible')
            .click({ force: true })

        cy.get('#dropdownBasic1')
            .first()
            .should('be.visible')
            .click()

        cy.get(' .dropdown-item-flat')
            .filter(':visible')
            .eq(3)
            .click()

    });

    it.only('Downloads MDA Assessments', () => {
        login(username, password)

        cy.get('#navbarDropdown10')
            .click()

        cy.get('[href="/user/mda-services"]')
            .should('be.visible')
            .click({ force: true })

        cy.get('#dropdownBasic1')
            .first()
            .should('be.visible')
            .click()

        cy.get(' .dropdown-item-flat')
            .filter(':visible')
            .eq(4)
            .click()

    });
});