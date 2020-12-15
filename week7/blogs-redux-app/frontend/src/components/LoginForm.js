import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import  { useField } from './../hooks'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  const { value:username, bind:bindUsername, reset:resetUsername } = useField('text')
  const { value:password, bind:bindPassword, reset:resetPassword } = useField('password')

  const history = useHistory()

  const handleReset = (e) => {
    e.preventDefault()
    resetUsername()
    resetPassword()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await props.login(username, password)
      props.notify('Successfully logged in!', 5)

      history.push('/')
    } catch (exception) {
      props.notify('Wrong credentials!', 5, 'danger')
    }
  }

  return (
    <div>
      <h3>Log in to application</h3>
      <Form>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control {...bindUsername} />
          <Form.Label>password:</Form.Label>
          <Form.Control {...bindPassword} />
	  <Button variant="success" type="submit" onClick={handleSubmit}>
	    login
	  </Button>
          <Button variant="warning" type="submit" onClick={handleReset}>
	    reset
	  </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default connect( null, { notify, login })(LoginForm)