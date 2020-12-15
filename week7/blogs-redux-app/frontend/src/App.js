import React, { useEffect } from 'react'
import BlogApp from './components/BlogApp'
import { initializeUsers } from './reducers/userReducer'
import { initializeCredentials } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeCredentials())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  return <BlogApp />
}

export default App