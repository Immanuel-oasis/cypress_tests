// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

Cypress.Commands.add('getMailinatorCode', (email) => {
    const apiKey = 'your-mailinator-api-key';
    const inbox = email.split('@')[0]; // extracts inbox name from email

    // Step 1: Get the inbox messages
    cy.request({
        method: 'GET',
        url: `https://www.mailinator.com/v4/public/inboxes.jsp?to=${inbox}`,
        // headers: {
        //     Authorization: apiKey
        // }
    }).then((response) => {
        // Step 2: Get the latest email id
        const latestEmail = response.body.msgs[0];
        const emailId = latestEmail.id;

        cy.log(`Latest email subject: ${latestEmail.subject}`);

        // Step 3: Fetch the full email content
        cy.request({
            method: 'GET',
            url: `https://mailinator.com/api/v2/domains/mailinator.com/inboxes/${inbox}/messages/${emailId}`,
            headers: {
                Authorization: apiKey
            }
        }).then((emailResponse) => {
            const emailBody = emailResponse.body.parts[0].body;
            cy.log(`Email body: ${emailBody}`);

            // Step 4: Extract the verification code using regex
            // Adjust the regex to match your code format
            const codeMatch = emailBody.match(/\b\d{6}\b/); // matches 6 digit code
            const verificationCode = codeMatch[0];

            cy.log(`Verification code: ${verificationCode}`);
            return cy.wrap(verificationCode); // return the code for use in test
        });
    });
});