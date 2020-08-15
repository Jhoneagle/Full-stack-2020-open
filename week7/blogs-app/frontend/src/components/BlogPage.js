import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogPage = ({
  name,
  handleLogout,
  blogs,
  blogForm,
  addlike,
  deleteBlog
}) => {
  const invidualBlog = (blog) => (
    <Blog key={blog.id}
      blog={blog}
      addlike={addlike}
      deleteBlog={deleteBlog}
    />
  )

  return (
    <div>
      <h2>Blog page</h2>

      <form onSubmit={handleLogout}>
        {name} logged in <button id="logout-button" type="submit">logout</button>
      </form>

      <br />

      <h3>Create new Blog</h3>

      {blogForm()}

      <h3>blogs</h3>

      {blogs.map(blog =>
        invidualBlog(blog)
      )}
    </div>
  )
}

BlogPage.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  blogForm: PropTypes.func.isRequired,
  addlike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogPage
