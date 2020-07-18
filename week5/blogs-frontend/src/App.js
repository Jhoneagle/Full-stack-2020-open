import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  const compareBlogs = (blog1, blog2) => {
    if (blog2.likes !== blog1.likes) {
      return blog2.likes - blog1.likes
    }

    return blog1.title > blog2.title
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareBlogs) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      notifyWith('login successful')
    } catch (exception) {
      notifyWith('wrong credentials', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    blogService.removeToken()

    notifyWith('logout successful')
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blogObject)

      const unsorted = [...blogs, newBlog]
      setBlogs(unsorted.sort(compareBlogs))

      notifyWith('Blog added successful')
    } catch (exception) {
      notifyWith('form not filled properly', 'error')
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const addlike = async (blog) => {
    try {
      const likedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      }

      const updatedBlog = await blogService.update(blog.id, likedBlog)
      updatedBlog.user = blog.user

      const updatedList = blogs.map(blog => blog.id === updatedBlog.id ?
        updatedBlog : blog).sort(compareBlogs)

      setBlogs(updatedList)

      notifyWith('Blog liked successful')
    } catch (exception) {
      notifyWith('Could not like the blog', 'error')
    }
  }

  const deleteBlog = async (blog) => {
    const message = `Remove ${blog.title} by ${blog.author}`

    if (!window.confirm(message)) {
      notifyWith('Blog is not removed', 'error')
      return
    }

    try {
      await blogService.del(blog.id)

      const updatedList = blogs.filter(b => b.id !== blog.id)
        .sort(compareBlogs)

      setBlogs(updatedList)

      notifyWith('Blog removed successful')
    } catch (exception) {
      notifyWith('Could not remove blog', 'error')
    }
  }

  const blogPage = () => (
    <BlogPage name={user.name}
      handleLogout={handleLogout}
      blogs={blogs}
      blogForm={blogForm}
      addlike={addlike}
      deleteBlog={deleteBlog}
    />
  )

  return (
    <div>
      <Notification notification={notification} />

      {user === null ?
        loginForm() :
        blogPage()
      }
    </div>
  )
}

export default App