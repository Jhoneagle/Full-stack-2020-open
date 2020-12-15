import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  return (
    <div className={props.notification.type}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)