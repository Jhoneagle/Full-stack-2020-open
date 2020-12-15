import React from 'react'
import Notification from './Notification'
import BlogList from './BlogList'
import Blog from './Blog'
import UserList from './UserList'
import User from './User'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import About from './About'
import Menu from './Menu'
import Footer from './Footer'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import './../App.css'

const BlogApp = (props) => {
  const matchBlog = useRouteMatch('/blogs/:id')
  const blogForRoute = matchBlog
    ? props.blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchUser = useRouteMatch('/users/:id')
  const userForRoute = matchUser
    ? props.users.find(user => user.id === matchUser.params.id)
    : null

  return (
    <div>
      <Notification />

      <h1>Bloglist</h1>

      {props.user !== null &&
        <Menu />
      }

      {props.user === null
        ? <Switch>
	  <Route path='/login'>
            <Togglable buttonLabel='Log in'>
              <LoginForm />
            </Togglable>
          </Route>

          <Redirect from='/' to='/login' />
        </Switch>
        : <Switch>
          <Route path="/about">
            <About />
          </Route>
	  <Route path="/createBlog">
            <BlogForm />
          </Route>

          <Route path='/users/:id'>
            <User user={userForRoute} />
          </Route>

          <Route path='/users'>
            <UserList />
          </Route>

          <Route path='/blogs/:id'>
            <Blog blog={blogForRoute} />
          </Route>

          <Route path='/blogs'>
            <BlogList />
          </Route>

          <Redirect from='/login' to='/blogs' />
          <Redirect from='/' to='/blogs' />
        </Switch>
      }

      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.login,
    blogs: state.blogs
  }
}

const ConnectedBlogApp = connect( mapStateToProps, null )(BlogApp)

export default ConnectedBlogApp