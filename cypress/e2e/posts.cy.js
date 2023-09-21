import articlePage from '../page-objects/article-page'
import homePage from '../page-objects/home-page'
import loginPage from '../page-objects/login-page'
import newPostPage from '../page-objects/new-post-page'

const Chance = require('chance')
const chance = new Chance()

describe('posts', () => {
  beforeEach(() => {
    cy.visit('/#/login')
    loginPage.login('kkraemer@test.com', 'password')
  })

  it('displays the new post page', () => {
    homePage.elements.newPostLink().click()
    cy.url().should('contain', '/editor')
    newPostPage.elements.titleField().should('be.visible')
    newPostPage.elements.subjectField().should('be.visible')
    newPostPage.elements.bodyField().should('be.visible')
    newPostPage.elements.publishButton().should('be.visible')
  })
  
  it('creates a new post', () => {
    const postTitle = chance.string({ alpha: true })
    const postSubject = chance.string({ alpha: true })
    const postBody = chance.string({ alpha: true })
    
    homePage.elements.newPostLink().click()
    newPostPage.createPost(postTitle, postSubject, postBody)
    
    cy.url().should('contain', `/article/${postTitle.toLowerCase()}`)
    articlePage.elements.titleText().should('contain', postTitle)
    articlePage.elements.bodyText().should('contain', postBody)
    articlePage.elements.authorLink().should('contain', 'kkraemer')
    articlePage.elements.editArticleButton().should('be.visible')
    articlePage.elements.deleteArticleButton().should('be.visible')
    
    cy.visit('/#/')
    homePage.elements.globalFeed().click()
    homePage.elements.articlePreviews().eq(0).within(() => {
      cy.contains('kkraemer')
      cy.contains(postTitle)
      cy.contains(postSubject)
    })
  })
  
  it('deletes a post', () => {
    const postTitle = chance.string({ alpha: true })
    const postSubject = chance.string({ alpha: true })
    const postBody = chance.string({ alpha: true })
    
    homePage.elements.newPostLink().click()
    newPostPage.createPost(postTitle, postSubject, postBody)
    
    articlePage.elements.deleteArticleButton().click()
    
    cy.visit('/#/')
    homePage.elements.globalFeed().click()
    homePage.elements.articlePreviews().should('have.length.of.at.least', 2).and('not.contain', postTitle)
  })
})
