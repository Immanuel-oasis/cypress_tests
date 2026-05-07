describe("Anambra state IRS update test", () => {

    // ℹ️LOGIN INFORMATION
    const TCC = "TCC - 45909239"
    const ASIN = "2041971836"
    const AIRS = "BP2062946838"
    const username = "tax@oasismgt.net"
    const password = "password"

    // 🧑‍🏫LOGIN HELPER function
    function login({ email = username, pass = password } = {}) {
        cy.visit("https://tax.oasisproducts.ng/auth/login");

        cy.get('[formcontrolname="email"]')
            .clear()
            .type(email)

        cy.get('#password')
            .clear()
            .type(pass)

        cy.get('[type="submit"]')
            .click()
    }

    it('login successfully', () => {
        login()
    })

})