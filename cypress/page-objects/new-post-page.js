class newPostPage {
  elements ={
    titleField : () => cy.get('input[placeholder="Article Title"]'),
    subjectField : () => cy.get(`input[placeholder="What's this article about?"]`),
    bodyField : () => cy.get('textarea[placeholder="Write your article (in markdown)"]'),
    publishButton : () => cy.contains('button', 'Publish Article')
  }
  
  createPost(title, subject, body) {
    this.elements.titleField().type(title)
    this.elements.subjectField().type(subject)
    this.elements.bodyField().type(body)
    this.elements.publishButton().click()
  }
}

module.exports = new newPostPage()
