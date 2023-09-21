class loginPage {
  elements ={
    emailField : () => cy.get('input[placeholder=Email]'),
    passwordField : () => cy.get('input[placeholder=Password]'),
    signinButton : () => cy.get('button[type=submit]'),
    errorMessages : () => cy.get('ul.error-messages')
  }
  
  login(email, password) {
    this.elements.emailField().type(email)
    this.elements.passwordField().type(password)
    this.elements.signinButton().click()
  }
}

module.exports = new loginPage()
