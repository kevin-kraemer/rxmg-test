class newPostPage {
  elements ={
    titleField : () => cy.get('input[placeholder="Article Title"]'),
    subjectField : () => cy.get(`input[placeholder="What's this article about?"]`),
    bodyField : () => cy.get('input[placeholder="Write your article (in markdown)"]'),
    publishButton : () => cy.contains('button', 'Publish Article')
  }
}

module.exports = new newPostPage()
