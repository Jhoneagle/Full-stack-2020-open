import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import BlogPage from './components/BlogPage'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      
      setBlogs([...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      
      notifyWith('Blog added successful')
    } catch (exception) {
      notifyWith('form not filled properly', 'error')
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login in to application</h2>
      
      <form onSubmit={handleLogin}>
        <div>
          username
	  <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
	  <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    </div>
  )

  const createBlog = () => (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
	  <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
	  <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
	  <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>      
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />

      {user === null ?
        loginForm() :
        <BlogPage name={user.name}
	  handleLogout={handleLogout}
	  blogs={blogs}
	  createBlog={createBlog}
	/>
      }
    </div>
  )
}

export default App