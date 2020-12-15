import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Card } from 'react-bootstrap'

const User = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Added blogs</Card.Subtitle>
        <ListGroup>
          {props.user.blogs.map(blog =>
            <ListGroup.Item key={blog.id}>
              {blog.title}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default connect()(User)