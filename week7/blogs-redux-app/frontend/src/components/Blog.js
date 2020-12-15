import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'

const Blog = (props) => {
  const history = useHistory()

  const del = async () => {
    if (window.confirm(`Delete '${props.blog.title}' by ${props.blog.author}?`)) {
      try {
        history.push('/blogs')
        await props.deleteBlog(props.blog)

        props.notify(`Deletation of '${props.blog.title}' by ${props.blog.author} was successful`, 5)
      } catch (exception) {
        props.notify(`Error occoured while deleting '${props.blog.title}' by ${props.blog.author}`, 5, 'error')
      }
    }
  }

  const canDelete = props.user !== null && props.blog.user.username === props.user.username

  return (
    <div>
      <h3>{props.blog.title} by {props.blog.author}</h3>
      <div>
        <a href='{props.blog.url}'>{props.blog.url}</a>
      </div>
      <div>
        {props.blog.likes} likes <button onClick={() => props.increaseLikes(props.blog)}>Like</button>
      </div>
      <div>addded by {props.blog.user.name}</div>
      {canDelete &&
        <div>
          <button id="delete-button" onClick={() => del()}>Remove</button>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.login }
}

export default connect( mapStateToProps, { increaseLikes, deleteBlog, notify })(Blog)