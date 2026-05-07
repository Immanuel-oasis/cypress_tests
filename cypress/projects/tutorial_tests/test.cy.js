describe('parabank banking site test', () => {

    it('User registers successfully', () => {

        cy.visit('https://parabank.parasoft.com/parabank/index.htm');

        cy.get('#loginPanel > :nth-child(3) > a').click({ force: true })

        cy.get('[name="customer.firstName"]')
            .should('be.enabled')
            .clear()
            .type("First name");

        cy.get('[name="customer.lastName"]')
            .clear()
            .type("Last Name");

        cy.get('[name="customer.address.street"]')
            .clear()
            .type("Adress @asfs address");

        cy.get('[name="customer.address.city"]')
            .clear()
            .type("City A");

        cy.get(':nth-child(5) > [width="20%"]')
            .clear()
            .type("sdsdsdsd");

        cy.get('[name="customer.address.zipCode"]')
            .clear()
            .type("sdsdsdsd");

        cy.get('[name="customer.phoneNumber"]')
            .clear()
            .type("sdsdsdsd");

        cy.get('[name="customer.ssn"]')
            .clear()
            .type("sdsdsdsd");

        cy.get(':nth-child(10) > [width="20%"]')
            .clear()
            .type("sdsdsdsd");

        cy.get('[name="customer.password"]')
            .clear()
            .type("sdsdsdsd");

        cy.get('[name="repeatedPassword"]')
            .clear()
            .type("sdsdsdsd");

        cy.get('[colspan="2"] > .button')
            .click();
    });

    it('user signin successfully', () => {

        cy.visit('https://parabank.parasoft.com/parabank/index.htm');

        cy.get('[name="username"]')
            .clear()
            .type("sdsdsdsd")

        cy.get('[name="password"]')
            .clear()
            .type("sdsdsdsd")

        cy.get(':nth-child(5) > .button')
            .click()
    });

    it('static dropdown selection', () => {

        cy.visit('https://parabank.parasoft.com/parabank/index.htm');

        cy.get('[name="username"]')
            .clear()
            .type("sdsdsdsd")

        cy.get('[name="password"]')
            .clear()
            .type("sdsdsdsd")

        cy.get(':nth-child(5) > .button')
            .click()

        cy.get('tbody > :nth-child(1) > :nth-child(1) > a')
            .click()

        cy.get('[name="month"]')
            .select(1)

        cy.get('[name="transactionType"]')
            .select(1)
    });

    it('dynamic dropdown testcase', () => {

        cy.get('[name="username"]')
            .clear()
            .type("sdsdsdsd")

        cy.get('[name="password"]')
            .clear()
            .type("sdsdsdsd")

        cy.get(':nth-child(5) > .button')
            .click()

        cy.get('tbody > :nth-child(1) > :nth-child(1) > a')
            .click()

        cy.get('[name="month"]')
            .select(1)

        cy.get('[name="transactionType"]')
            .select(1)
    });
})