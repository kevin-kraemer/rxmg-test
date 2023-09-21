class articlePage {
  elements ={
    titleText : () => cy.get('h1'),
    authorLink : () => cy.get('a.author'),
    bodyText : () => cy.get('div.article-content'),
    editArticleButton : () => cy.contains('a', 'Edit Article'),
    deleteArticleButton : () => cy.contains('button', 'Delete Article')
  }
}

module.exports = new articlePage()
