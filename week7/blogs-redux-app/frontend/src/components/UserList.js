import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = (props) => {
  if (props.users) {
    return (
      <div>
        <h2>users</h2>
        <Table striped bordered hover>
          <tbody>
	    <tr>
              <td>User</td>
              <td>Blogs created</td>
            </tr>
            {props.users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
	  </tbody>
        </Table>
      </div>
    )
  }

  return null
}

const mapStateToProps = (state) => {
  return { users: state.users }
}

export default connect(mapStateToProps)(UserList)