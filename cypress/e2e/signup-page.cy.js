import signupPage from '../page-objects/signup-page'

const Chance = require('chance')
const chance = new Chance()

describe('signup page', () => {
  beforeEach(() => {
    cy.visit('/#/register')
  })

  it('displays the signup page', () => {
    cy.get('h1').should('contain', 'Sign Up')
    signupPage.elements.usernameField().should('be.visible')
    signupPage.elements.emailField().should('be.visible')
    signupPage.elements.passwordField().should('be.visible')
    signupPage.elements.signupButton().should('be.visible')
    signupPage.elements.errorMessages().should('not.exist')
  })
  
  it('allows the creation of a new account', () => {
    const testEmail = chance.email({domain: 'test.com'})
    const testUsername = testEmail.split('@')[0]
    
    signupPage.elements.usernameField().type(testUsername)
    signupPage.elements.emailField().type(testEmail)
    signupPage.elements.passwordField().type('password')
    signupPage.elements.signupButton().click()
    
    cy.url().should('eq', 'https://rx-devtest.com/#/')
    cy.get(`a[href="#/@${testUsername}"]`).should('contain', testUsername)
  })
  
  it('rejects invalid usernames', () => {
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('contain', "The 'username' field is required!")
    
    signupPage.elements.usernameField().type('a')
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('contain', "The 'username' field length must be larger than or equal to 2 characters long!")
    
    signupPage.elements.usernameField().type('aa!@#$')
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('contain', "The 'username' field fails to match the required pattern!")
    
    signupPage.elements.usernameField().clear().type('ab')
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('not.contain', 'username')
  })
  
  it('rejects invalid emails', () => {
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('contain', "The 'email' field is required!")
    
    signupPage.elements.emailField().type('foo@bar')
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('contain', "The 'email' field must be a valid e-mail!")
    
    signupPage.elements.emailField().type('.com')
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('not.contain', 'email')
  })
  
  it('rejects invalid passwords', () => {
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('contain', "The 'password' field is required!")
    
    signupPage.elements.passwordField().type('a')
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('contain', "The 'password' field length must be larger than or equal to 6 characters long!")
    
    signupPage.elements.passwordField().type('bcdef')
    signupPage.elements.signupButton().click()
    signupPage.elements.errorMessages().should('not.contain', 'password')
  })
})
