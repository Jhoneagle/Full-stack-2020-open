import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

import LoginForm from './LoginForm'

const Login = () => {
  return (
    <>
      <Row className='vh-100 align-items-center justify-content-center'>
        <Col xs={12} sm={7} md={6} lg={4}>
          <Card>
            <Card.Header>
              <h1 className='h3'>Login</h1>
            </Card.Header>
            <Card.Body>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Login