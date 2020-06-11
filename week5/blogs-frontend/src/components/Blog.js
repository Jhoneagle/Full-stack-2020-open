import React from 'react'

const Blog = ({ blog }) => (
  <div className="blogPost">
    {blog.title} {blog.author}
  </div>
)

export default Blog
