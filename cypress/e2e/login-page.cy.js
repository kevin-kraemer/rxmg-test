import loginPage from '../page-objects/login-page'

const validUsername = 'kkraemer'
const validEmail = 'kkraemer@test.com'
const validPassword = 'password'

describe('login page', () => {
  beforeEach(() => {
    cy.visit('/#/login')
  })

  it('displays the login page', () => {
    cy.get('h1').should('contain', 'Sign In')
    loginPage.elements.emailField().should('be.visible')
    loginPage.elements.passwordField().should('be.visible')
    loginPage.elements.signinButton().should('be.visible')
    loginPage.elements.errorMessages().should('not.exist')
  })
  
  it('signs in with valid credentials', () => {
    loginPage.elements.emailField().type(validEmail)
    loginPage.elements.passwordField().type(validPassword)
    loginPage.elements.signinButton().click()
    
    cy.url().should('eq', 'https://rx-devtest.com/#/')
    cy.get(`a[href="#/@${validUsername}"]`).should('contain', validUsername)
  })
  
  
  it('rejects invalid credentials', () => {
    loginPage.elements.signinButton().click()
    loginPage.elements.errorMessages().should('contain', "The 'user.email' field is required!")
      .and('contain', "The 'user.password' field is required!")
    
    loginPage.elements.emailField().type('foo@bar.com')
    loginPage.elements.passwordField().type('foobar')
    loginPage.elements.signinButton().click()
    loginPage.elements.errorMessages().should('contain', "email is not found")
    
    loginPage.elements.emailField().clear().type(validEmail)
    loginPage.elements.signinButton().click()
    loginPage.elements.errorMessages().should('contain', "email is not found")
  })
})
