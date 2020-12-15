import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
  if (props.blogs) {
    return (
      <div>
        <h2>blogs</h2>
        {props.blogs.map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </div>
        )}
      </div>
    )
  }

  return null
}

const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}

export default connect(mapStateToProps)(BlogList)