import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { logout } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const Menu = (props) => {
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.logout()
    props.notify('Successfully logged out!', 5)

    history.push('/')
  }

  return (
    <div>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      <Link to="/createBlog">create new</Link>
      <Link to="/about">about</Link>

      <span>{props.user.name} logged in&emsp;
        <button onClick={handleSubmit}>logout</button>
      </span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.login }
}

export default connect( mapStateToProps, { logout, notify })(Menu)
