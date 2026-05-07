describe('Min of Transportation website test', () => {
  const userLicenseDetails = {
    ASIN : 17602288105,
    FULLNAME:	"CHINAZA UCHENDU",
    EMAIL :	"chinazamaryrose23@gmail.com",
    PHONE :	"08123649801",
    ADDRESS :	"298 Ziks Avenue Awka",
    WORKSHOP :	"So and so limitd",
    JOBTITLE : "Category A",
    APPRENTICE :	"No",
    DATE: "Apr 14, 2026, 3:33 PM"
  }

  beforeEach(() => {
    cy.visit('http://41.207.248.246:3600/');
  });


  it('All links function properly', () => {
    // get all the links in the site
    const site_links = []
    const link_texts = []
    cy.get("ul[class*='nav-link mt-2']").find("li a").each(($a) => {
      site_links.push($a.prop('href'));
      link_texts.push($a.text())
    }).then(() => {
      // visit all site links
      for (let i = 0; i < site_links.length; i++) {
        cy.visit(site_links[i]);
        cy.get('body').should('contain.text', link_texts[i]);
      }
    })  
  })

  it("Login button functions properly", () => 
    {
      
      //Logining in and out with valid and invalid email and password
      const email = [ "tukur@mailinator.com"];
      const password = ["password"]
      // const expectedMessage = ["invalid email", "invalid email", "invalid email", ""]

      for (let i = 0; i < email.length; i++) 
      {
        login(email[i], password[i])
      }
    });

    it ("Test Artisan license creation", () => {
      login();

      cy.get("li[routerlink*='/user/license']").click({ force: true });
      cy.get("select[id=licenseType]").select("ARTISANS")
      clickButton("APPLY");

      cy.get("input[placeholder='e.g. 12354676876985']").type(userLicenseDetails.ASIN);
      clickButton("Verify ASIN")


      // test job categories
      const jobCategories = ["Category A" , "Category B"]
      const businessName = "So and so limitd";
      let isFirstRun = true;

      // Tests all possible combination of categories and whether or not the use is an Aprentice while creating the Artisan license
      // Catrgory  |  isApprentice 
      // A         | false
      // B         | true
      // A         | false
      // B         |  true


      for (let i = 0; i < jobCategories.length ; i ++ ) 
      {
        for (let j = 0; j < jobCategories.length; j++) 
        {
          
          testArtisan(jobCategories[i], j, businessName, isFirstRun);
          isFirstRun = false;

        }
      }
      
    })

    it ("Test Automobile Workshop", () =>
    {
      login();

      cy.get("li[routerlink*='/user/license']").click({ force: true });
      cy.get("select[id=licenseType]").select("ARTISANS")



    });

    it.only ("Check data flow through different level for only artisan", () =>
    {
      // gets the user at the second level i.e reviewer
      const level = 0
      const user = getUserLevelDetails({level: level})

      login(user.email, user.password);

      cy.get("li[routerlink*='/admin/license-applications-new']").click({ force: true });

      clickButton("Search")

      // cy.get("input[placeholder='Enter Reference']").type(userLicenseDetails.WORKSHOP)
      cy.get("input[placeholder='Enter asin']").type(userLicenseDetails.ASIN)
      clickButton("Apply Filter")
      clickButton("✕")
      clickButton("All")
      cy.wait(2000)
      
      // GET SPECIFIC ELEMENT
      cy.get("table tbody tr").each(($tr) => 
      {
        const fullName = $tr.find("td[data-label=APPLICANT]").text().trim();
        const regDate = $tr.find("td[data-label='APPLICATION DATE']").text().trim();
        const tableMap = {};
        let assertSuccess = true;

        if (fullName === userLicenseDetails.FULLNAME.trim() && regDate === userLicenseDetails.DATE.trim())
        {
          cy.wrap($tr).find("li[class*='dropdown-li']")
            .should('exist') 
            .as('btn')          

          cy.get('@btn').click({force:true})
          cy.get("div[class*='table-responsive']", { timeout: 10000 })
          .should('be.visible');

          cy.get("div[class*='table-responsive'] tr")
          .each(($tr) => {
            // get the two td elements
            const key = $tr.find("td:nth-child(1)").text().trim().replace(/\s+/g, '');
            const value = $tr.find("td:nth-child(2)").text().trim();

            // add to map
            tableMap[key] = value;
          }).then(() => {
            try {
              Object.keys(tableMap).forEach((key) => {
              expect(userLicenseDetails[key], `Checking ${key}`)
                .to.equal(tableMap[key]);
            });
            } catch (error) {
              assertSuccess = false;
            }

            if (assertSuccess)
            {
              if (level === 1) {clickButton(" Recommend for Inspection ");  clickButton("Yes")}
              if (level === 2) {clickButton(" Submit Inspection Information "); clickButton(" Save Note ")}
              if (level === 3) clickButton(" Recommend for Inspection ")
              if (level === 4) clickButton(" Recommend for Inspection ")
              
             
            }

          });


          
        }
        return false;
      })


    })

})





// HELP FUNCTIONS
function testArtisan(category, isApprentice, businessName, isFirstRun)
{
 if (isFirstRun === false) 
 {
   cy.get("select[id=licenseType]").select("ARTISANS")
      cy.get("button").contains("APPLY").click({force:true})

      cy.get("input[placeholder='e.g. 12354676876985']").type("17602288105");
      clickButton("Verify ASIN")
 }
  cy.get("input[placeholder='Enter Workshop Name']").type(businessName);
      cy.get("select[formcontrolname='jobTitle']").select(category);
      isApprentice == 0 && cy.get("span[class*=slider]").click({multiple:true, force:true})
      cy.wait(2000);
      clickButton("PROCEED")
      clickButton("PROCEED TO PAYMENT")
      isFirstRun === false && cy.wait(5000)
      clickButton("Pay Online")

      cy.wait(6000);

      cy.visit("http://41.207.248.246:3600/user/license")
}


function login (email="mndueso@oasismgt.net", password="*Mndueso3")  {
    // get the login button
    cy.get("button[class*=login]").click({force:true});

  // compare
        cy.get("input[id*='Email-ASIN']").type(email)
        cy.get("input[id*='login-password']").type(password)
        // click the login button
        cy.get("button[style*='height: 50px !important;']").contains("Login").click({force:true})
}

function clickButton(buttonName, className="none") {
  className != "none" && cy.get(`button[class=${className}]`).click({force:true})
  className === "none" && cy.get('button').contains(buttonName).click({force:true})
}


function getUserLevelDetails({level = 0})
{
  const user = [
    {
      email: "mndueso@oasismgt.net",
      password: "*Mndueso3"
    },{
      email: "tukur@mailinator.com",
      password: "password"
    },{
      email: "almustaphatukur111@gmail.com",
      password: "password"
    },{
      email: "umar@mailinator.com",
      password: "password"
    },{
      email: "nesta@mailinator.com",
      password: "password"
    },
  ]

  return user[level];
}