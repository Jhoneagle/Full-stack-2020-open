import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useField } from './../hooks'

const BlogForm = (props) => {
  const { value:title, bind:bindTitle, reset:resetTitle } = useField('text')
  const { value:author, bind:bindAuthor, reset:resetAuthor } = useField('text')
  const { value:url, bind:bindUrl, reset:resetUrl } = useField('text')

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newBlog = { title, author, url }

      await props.createBlog(newBlog)
      props.notify(`A new blog '${title}' by ${author} added`, 5)

      history.push('/blogs')
    } catch (exception) {
      props.notify('Invalid Information! Please fill out the form correctly.', 5, 'error')
    }
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form>
        <div>
          title:
          <input  {...bindTitle} />
        </div>
        <div>
          author:
          <input  {...bindAuthor} />
        </div>
        <div>
          url:
          <input  {...bindUrl} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default connect( null, { createBlog, notify })(BlogForm)