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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  
  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    
    try {
      const newBlog = await blogService.create(blogObject)
      
      setBlogs([...blogs, newBlog])
      
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

  return (
    <div>
      <Notification notification={notification} />

      {user === null ?
        loginForm() :
        <BlogPage name={user.name}
	  handleLogout={handleLogout}
	  blogs={blogs}
	  blogForm={blogForm}
	/>
      }
    </div>
  )
}

export default App