class homePage {
  elements ={
    newPostLink : () => cy.contains('a', 'New Post'),
    globalFeed : () => cy.contains('a', 'Global Feed'),
    articlePreviews : () => cy.get('div.article-preview')
  }
}

module.exports = new homePage()
