import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { increaseLikes, deleteBlog, createComment } from '../reducers/blogReducer'
import { useField } from './../hooks'
import { useHistory } from 'react-router-dom'
import { Form, Button, ListGroup, Card, Badge } from 'react-bootstrap'

const Blog = (props) => {
  const { value:content, bind:bindContent, reset:resetContent } = useField('text')
  const history = useHistory()

  const del = async () => {
    if (window.confirm(`Delete '${props.blog.title}' by ${props.blog.author}?`)) {
      try {
        history.push('/blogs')
        await props.deleteBlog(props.blog)

        props.notify(`Deletation of '${props.blog.title}' by ${props.blog.author} was successful`, 5)
      } catch (exception) {
        props.notify(`Error occoured while deleting '${props.blog.title}' by ${props.blog.author}`, 5, 'danger')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const comment = { content }
      await props.createComment(props.blog, comment)
      props.notify('Comment added successfully', 5)

      resetContent()
    } catch (exception) {
      props.notify('Comment creation was not successful!', 5, 'danger')
    }
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
  }

  const canDelete = props.user !== null && props.blog.user.username === props.user.username

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.blog.title} by {props.blog.author}</Card.Title>
        <Card.Link href={props.blog.url}>
          {props.blog.url}
        </Card.Link>
        <Card.Text>
          <Button variant="success" onClick={() => props.increaseLikes(props.blog)}>
            Like <Badge variant="light">{props.blog.likes}</Badge>
            <span className="sr-only">likes</span>
          </Button>
        </Card.Text>
        <Card.Text>addded by {props.blog.user.name}</Card.Text>
        {canDelete &&
          <Card.Text>
            <Button id="delete-button" variant="danger" onClick={() => del()}>Remove</Button>
          </Card.Text>
        }
        <h5>Comments</h5>
        <Form>
          <Form.Group>
            <Form.Control {...bindContent} />
            <Button variant="success" onClick={handleSubmit}>add comment</Button>
            <Button variant="warning" onClick={handleReset}>reset</Button>
          </Form.Group>
        </Form>
        <ListGroup variant="flush">
          {props.blog.comments.map(comment =>
            <ListGroup.Item key={comment.id}>
              {comment.content}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return { user: state.login }
}

export default connect( mapStateToProps, { increaseLikes, deleteBlog, createComment, notify })(Blog)