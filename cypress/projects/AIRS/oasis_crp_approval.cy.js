describe('CrpApproval Login', () => {

    // ================================
    // REUSABLE LOGIN FUCTION
    // ================================
    function login() {
        cy.get('.welcomeMessage').trigger('mouseover');

        cy.get(':nth-child(4) > .login-input')
            .should('be.enabled')
            .clear()
            .type('okoriecare');

        cy.get('[style="margin-bottom: 0;"] > .login-input')
            .should('be.enabled')
            .clear()
            .type('okoriecare');

        cy.get('.signIn-btn')
            .click({ force: true });
    }


    beforeEach(() => {
        cy.visit('https://backoffice.oasisproducts.ng/login')
    })

    it('Login fails with wrong username and password', () => {
        cy.get('.welcomeMessage').trigger('mouseover')

        cy.get(':nth-child(4) > .login-input')
            .should('be.enabled')
            .clear()
            .type('James bond')

        cy.get('[style="margin-bottom: 0;"] > .login-input')
            .should('be.enabled')
            .clear()
            .type('password')

        cy.get('.signIn-btn')
            .click({ force: true })

        cy.get('.infoParagraph').should('contain.text', 'Invalid')

        cy.wait(10000)

        cy.get('.fa-solid')
            .click()
    });

    // ========================
    // #username = okoriecare
    // #password = okoriecare
    // ========================

    it('login successful with right credentials', () => {
        login();

    })

    it('Business menu item route successfully', () => {
        login()

        cy.get('.fa')
            .click()

        cy.get(':nth-child(1) > .sidebar-link')
            .should('be.visible')
            .click({ force: true })

        cy.get('#collapseExample2 > .tree-menu > ul > li')
            .should('be.visible')
            .each(($li) => {
                const routeLink = $li.attr('routerlink')
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-')

                const spanText = $li.find('span')
                    .text()
                    .toLowerCase()

                console.log(spanText)
                console.log(routeLink)

                expect(routeLink).to.include(spanText)
            });
    });


})


