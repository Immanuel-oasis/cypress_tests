// This script was written to test the routing in Konga Ecommerce Website using basic cypress functions to know whether the test succeeds or fails
// TO run all the code in this file remove the "only" from the it.only to make it just it that way the compiler would run the entire script


describe('Konga Website Test', () => {
  // visits the Konga website before any test case is run
  beforeEach(() => {
    cy.visit("https://www.konga.com/");

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false // returning false prevents Cypress from failing the test
    })
  });


  it('Drop down menu items point properly to where the are expected to', () => {

    // clicks the help drop down menu
    cy.get("div[class='DesktopNavigation_dropdown__ISRZJ']").click()

    // display the menu items
    cy.get("ul[class*='dropDown_dropdownList__JIMDY DesktopNavigation_dropdownList__VIbTD']")
        .invoke('css', 'visibility', 'visible')
        .invoke('css', 'display', 'block')
        .invoke('css', 'opacity', '1');

    // get all the items in the dropdown menu
    cy.get("ul[class*='dropdownList']")
        .find("li")
        .each(($li) => {
          cy.log($li.text()); // This will print each li's text in the Cypress log
        });

    // open the contact us page from the drop down menu
    cy.get("ul[class*='dropDown_dropdownList__JIMDY DesktopNavigation_dropdownList__VIbTD']").find("li").contains("Contact Us").click()

    const links = []
    // open all the options on the dropdown menu
    cy.get("ul[class*='dropdownList']").find("li a").each(
        ($a) => {
          links.push($a.prop('href'))
        }
    ).then(() => {
      links.forEach((link) => {
        cy.visit(link);
        cy.go('back')
      })    })
  })

  it ("Login functions properly", () => {
    //find the login button
    cy.get("div[class*='DesktopNavigation_authLink__Zpjyj']")
        .find('a')
        .then(($a) => {
          const href = $a.prop('href');
          cy.visit(href);
        });
    
    // get the username and password input fields and input a wrong username and password
      let usernames = ["James@gmail.com", "Benson", "thomas@gmail.com"]
      const password = ["12345678", "Password", "lavesadas"]
      const messages = ["Please try again", "Please try again", "Please try again"]

      for (let i = 0; i < usernames.length; i++) {
          cy.get("input[id='username']").clear().type(usernames[i]);
          cy.get("input[id='password']").clear().type(password[i]);

          cy.get("button[type*='submit']").click()

          cy.get("div[class*='loginForm_error__geIzG']").should("be.visible").and("contain.text", messages[i])
      }

      //try Create an account
      cy.get("a[class='authPageLayout_signupLink__Izu_R']").click({multiple:true})

      // create new user using the email immanuel@mailinator.com
      cy.get("input[id*='firstname']").type("John");
      cy.get("input[id*='lastname']").type("Doe");
      cy.get("input[id*='email']").type("mmmanuel@mailinator.com");
      cy.get("input[id*='phone']").type("08198868203");
      cy.get("input[id*='date_of_birth']").type("2010-11-11");
      cy.get("select[id*='gender']").select("male");
      cy.get("input[id*='password']").type("Immanuel@mailinator.com1");
      cy.get("input[id*='confirmPassword']").type("Immanuel@mailinator.com1");
      cy.get("button[class*='button_button__cpnXl signup_signupButton__45b2O']").click({multiple:true});
  })

    // Test product order in Konga
  it.only ("Order a Product on Konga", () => {
      // click the login button
      cy.get("div[class*='DesktopNavigation_authLink__Zpjyj']").click({multiple:true})


      cy.get("input[id='username']").clear().type("mmmanuel@mailinator.com");
      cy.get("input[id='password']").clear().type("Immanuel@mailinator.com1");

      cy.get("button[type*='submit']").click()

      // select the electronics categories
      cy.get("div[class*='DesktopNavigation_navItemsBand__oW5jt']").find("a[class*='DesktopNavigation_navItem__TBbw6']").contains("Electronics").click({force:true, multiple:true})

      // list of products


      const productsUrl = []
      const productName = []
      cy.get("div[class*='ListingCard_listingCardProductImage__b_Ivy'] a").each(($a) => {
        products.push($a.prop('href'))
      })

      cy.visit(productUrl[0])

  })
})