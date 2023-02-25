const seedBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'http://url1',
    likes: 23,
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'http://url2',
    likes: 1400
  }
]
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

    describe('When logged in', function(){
      beforeEach(function(){
        cy.login({ username: 'root', password: 'root' })
        cy.createBlog(seedBlogs[0])
        cy.createBlog(seedBlogs[1])
      })

      it('a new blog can be added', function(){
        cy.get('#btn-label').click()

        cy.get('form').should('be.visible').as('blogForm')
        cy.get('#title').type('some title')
        cy.get('input#author').should('be.visible').type('some author')
        cy.get('input#url').should('be.visible').type('http://some.url.com')
        cy.get('#create').should('be.visible').click()

        cy.contains('some title').should('be.visible')
        cy.contains('some author').should('be.visible')
      })
      it('a user can like a blog', function(){
        cy.get('#blogs-section').contains('Blog 1').parent().as('blog1')
        cy.get('@blog1').contains('view').click()

        cy.contains('Blog 1').parent().parent().as('fullView')
        cy.get('@fullView').contains(seedBlogs[0].likes)
        cy.get('@fullView').contains('like').click()
        cy.get('@fullView').contains(seedBlogs[0].likes+1)
      })
      it.only('user who created a blog can delete it', function(){
        cy.get('#blogs-section')
          .contains('Blog 1')
          .parent()
          .contains('view').click()
        cy.get('#blogs-section')
          .contains('Blog 1')
          .parent().parent().as('fullView')
        cy.get('@fullView')
          .contains('remove')
          .click()
        cy.on('window.confirm', () => true)

        cy.contains(`deleted ${seedBlogs[0].title}`)
        cy.get('html').should('not.contain', 'Blog 1')
      })
    })

  })
})