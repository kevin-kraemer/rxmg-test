class signupPage {
  elements ={
    usernameField : () => cy.get('input[placeholder=Username]'),
    emailField : () => cy.get('input[placeholder=Email]'),
    passwordField : () => cy.get('input[placeholder=Password]'),
    signupButton : () => cy.get('button[type=submit]'),
    errorMessages : () => cy.get('ul.error-messages')
  }
}

module.exports = new signupPage()
