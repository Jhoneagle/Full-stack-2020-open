import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addlike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const limitedBlog = () => (
    <div className="blogPost">
      {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
    </div>
  )

  const canDelete = user !== null && blog.user.username === user.username

  const fullBlog = () => (
    <div className="blogPost">
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={() => addlike(blog)}>Like</button>
      </div>
      <div>{blog.user.name}</div>
      {canDelete &&
        <div>
          <button onClick={() => deleteBlog(blog)}>Remove</button>
        </div>
      }
    </div>
  )

  return (
    <div>
      {!visible ?
        limitedBlog() :
        fullBlog()
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addlike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
