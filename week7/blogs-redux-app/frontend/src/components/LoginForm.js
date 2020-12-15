import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import  { useField } from './../hooks'

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
      props.notify('Wrong credentials!', 5, 'error')
    }
  }

  return (
    <div className='loginForm'>
      <h3>Log in to application</h3>
      <form>
        <div>
          username:
          <input  {...bindUsername} />
        </div>
        <div>
          password:
          <input  {...bindPassword} />
        </div>
        <button onClick={handleSubmit}>login</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default connect( null, { notify, login })(LoginForm)