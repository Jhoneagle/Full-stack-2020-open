describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.createUser({
      name: 'John Eagle',
      username: 'admin',
      password: 'secret123'
    })
  })

  it('Login from is shown', function() {
    cy.contains('Login to application')
  })

  describe('Login',function() {
    it('Succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('secret123')
      cy.get('#login-button').click()

      cy.contains('John Eagle logged in')
    })

    it('Fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('randomPassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'John Eagle logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'secret123' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('How to create a blog post')
      cy.get('#author').type('Mr Random')
      cy.get('#url').type('www.google.com')
      cy.get('#create-blog-button').click()

      cy.get('.success')
        .should('contain', 'Blog added successful')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('A blog can not be created if fields empty', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Johneagle')
      cy.get('#create-blog-button').click()

      cy.get('.error')
        .should('contain', 'form not filled properly')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('and a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'My personal website',
          author: 'Johneagle',
          url: 'johneagle.omat.fi'
        })

        cy.contains('View').click()
      })

      it('A blog can be liked', function() {
        cy.get('#like-button').click()

        cy.get('.success')
          .should('contain', 'Blog liked successful')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('A blog can be hide after viewing it', function() {
        cy.contains('Hide').click()

        cy.get('.blogPost')
          .should('contain', 'Johneagle')
          .and('not.contain', 'johneagle.omat.fi')
      })

      it('A blog can be removed by owner', function() {
        cy.get('#delete-button').click()

        cy.get('.success')
          .should('contain', 'Blog removed successful')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('A blog can not be removed by others', function() {
        cy.get('#logout-button').click()

        cy.createUser({
          name: 'Matti Suomalainen',
          username: 'mattikus99',
          password: 'ysarinlapsi'
        })

        cy.login({ username: 'mattikus99', password: 'ysarinlapsi' })

        cy.contains('View').click()
        cy.get('.blogPost').should('not.contain', 'Remove')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'My personal website',
          author: 'Johneagle',
          url: 'johneagle.omat.fi'
        })

        cy.createBlog({
          title: 'How to create a blog post',
          author: 'Mr Random',
          url: 'www.google.com'
        })

        cy.createBlog({
          title: 'Saavutettavuuden tärkeys',
          author: 'Tero Kokko',
          url: 'www.saavutettavuus.fi'
        })
      })

      it('Blogs order themself by how many likes they have', function() {
        cy.get('.blogPost').then( posts => {
          cy.wrap(posts[0]).find('#view-button').click()
          cy.wrap(posts[1]).find('#view-button').click()
          cy.wrap(posts[2]).find('#view-button').click()
        })

        cy.contains('Tero Kokko').parent().find('#like-button').click()
        cy.wait(2000)

        cy.get('.blogPost').then( posts => {
          cy.wrap(posts[0])
            .should('contain', 'likes 1')
            .and('contain', 'Tero Kokko')
          cy.wrap(posts[1])
            .should('contain', 'likes 0')
            .and('contain', 'Johneagle')
          cy.wrap(posts[2])
            .should('contain', 'likes 0')
            .and('contain', 'Mr Random')
        })

        cy.contains('Mr Random').parent().find('#like-button').as('twoLikesButton')
        cy.get('@twoLikesButton').click()
        cy.get('@twoLikesButton').click()
        cy.wait(2000)

        cy.get('.blogPost').then( posts => {
          cy.wrap(posts[0])
            .should('contain', 'likes 2')
            .and('contain', 'Mr Random')
          cy.wrap(posts[1])
            .should('contain', 'likes 1')
            .and('contain', 'Tero Kokko')
          cy.wrap(posts[2])
            .should('contain', 'likes 0')
            .and('contain', 'Johneagle')
        })
      })
    })
  })
})