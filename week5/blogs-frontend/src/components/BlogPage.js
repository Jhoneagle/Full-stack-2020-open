import React from 'react'
import Blog from './Blog'

const BlogPage = ({ name, handleLogout, blogs, blogForm }) => (
  <div>
    <h2>Blog page</h2>

    <form onSubmit={handleLogout}>
      {name} logged in <button type="submit">logout</button>
    </form>

    <br />

    <h3>Create new Blog</h3>

    {blogForm()}

    <h3>blogs</h3>

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default BlogPage
