describe('Anambra IRS userflow test', () => {
    // =======================
    // login helper function
    // =======================

    const TCC = "TCC - 45909239"
    const ASIN = "2041971836"
    const AIRS = "BP2062946838"
    const username = 16435834947
    const password = 16435834947

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

    it('fails login on wrong credentials', () => {
        login("fakeusername", "fakepassword")

        cy.get('.ajs-message')
            .should('be.visible')
            .should('contain.text', 'Invalid')
    });

    it('sign in successfully with correct credentials', () => {
        login(username, password)
    })

    it('creates new stamp duty', () => {
        login(username, password)

        cy.get('a[role=button]')
            .first()
            .click()

        cy.get('[href="/user/stamp-duty"]')
            .should('be.visible')
            .click()

        cy.get('.btn > span')
            .click({ force: true })

        cy.get('.col-sm-12 > .form-select')
            .select(1)

        cy.get('.col-md-6 > .form-select')
            .select(1)

        cy.get('#partyFullName')
            .clear()
            .type('uu')

        cy.get('#partyEmail')
            .clear()
            .type('fakeemail@gmail.com')

        cy.get('#partyMobile')
            .clear()
            .type('09132342342')

        cy.get('#partyAddress')
            .clear()
            .type('fake address, fake city, fake town, fake state')

        // CLICK THE ADD PARTY BUTTON
        cy.get('button.add-party-btn')
            .click()

        cy.get('#transactionAmount')
            .clear()
            .type(1000)

        cy.get('#transactionExtraCopyCount')
            .clear()
            .type(1000)

        cy.get('#transactionDescription')
            .should('be.enabled')
            .clear()
            .type("Valid description for this")

        cy.get('#executionDate')
            .type('2022-04-11')

        cy.get('.mt-5 > .btn')
            .click()
    });

    it('creates withholding taxes', () => {
        login(username, password)

        cy.get('#navbarDropdown19')
            .should('be.visible')
            .click({ force: true })

        cy.get('.nav-item.show > .dropdown-menu > .dropdown-item')
            .click({ force: true })

        cy.get('#add-employee')
            .click({ multiple: true })

        cy.get('.d-flex > .d-inline > .dropdown-menu-flat > :nth-child(1)')
            .click()

        cy.get('.col-md-6 > input')
            .should('be.enabled')
            .clear()
            .type(ASIN)

        // VERIFY ASIN
        cy.get('.col-md-6 > button')
            .click()

        cy.get('.col-md-4 > select')
            .select(1)

        cy.get('.col-md-4 > input')
            .eq(8)
            .clear()
            .type('2027-06-04')

        cy.get('.col-md-4 > input')
            .eq(9)
            .clear()
            .type('10000')

        // cy.get('.col-md-4 > input')
        //     .eq(11)
        //     .clear()
        //     .type('10000')

        cy.get('.col-md-4 > textarea')
            .clear()
            .type('This is a valid description of what is written')

        // FILE SELECTION
        cy.get('.col-md-4 > input')
            .eq(12)
            .selectFile('cypress/files/Software testing tutorial.txt')

        // CREATE ASSESSMENT
        cy.get('.action-buttons > button')
            .first()
            .click()

        // PROCEED
        cy.get('.btn-primary')
            .click()

        cy.get(':nth-child(3) > .btn')
            .click()
    });

    // ===================================
    // 🪪 CARD DETAILS
    // 5061050254756707864	 
    // 06 / 26	
    // 111	
    // 1111
    // 123456 
    // ===================================

    it('makes payment on withholding taxes', () => {
        login(username, password)

        cy.get('#navbarDropdown19')
            .should('be.visible')
            .click({ force: true })

        cy.get('.nav-item.show > .dropdown-menu > .dropdown-item')
            .click({ force: true })

        cy.get('#dropdownBasic1')
            .click()

        cy.get('.dropdown-menu-flat > .dropdown-item-flat')
            .eq(2)
            .click()

        cy.get('.btn-close')
            .click()

        cy.get('#dropdownBasic1')
            .click()

        cy.get('.dropdown-menu-flat > .dropdown-item-flat')
            .contains('Make Payment')
            .click()

        cy.wait(2000)

        cy.get('#interswitch > img')
            .click({ force: true })

        cy.wait(60000)

        cy.get('.button-section > button')
            .click()
    })
});