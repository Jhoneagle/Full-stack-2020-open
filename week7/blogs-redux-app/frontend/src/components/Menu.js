import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { logout } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.logout()
    props.notify('Successfully logged out!', 5)

    history.push('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/createBlog">create new</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em>
	      {props.user.name} logged in&emsp;
              <Button variant="info" onClick={handleSubmit}>logout</Button>
	    </em>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return { user: state.login }
}

export default connect( mapStateToProps, { logout, notify })(Menu)
