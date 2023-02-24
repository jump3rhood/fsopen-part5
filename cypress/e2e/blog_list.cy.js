describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function(){
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')
  })
  describe('login', function(){
    beforeEach(function(){
      const user = {
        username: 'root',
        password: 'root',
        name: 'root'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.contains('root logged in')
    })
    it('fails with wrong credentials', function(){
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
        .should('have.class','error')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})