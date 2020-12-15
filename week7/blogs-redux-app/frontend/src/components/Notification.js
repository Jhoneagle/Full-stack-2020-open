import React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  return (
    <Alert variant={props.notification.type}>
      {props.notification.message}
    </Alert>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)