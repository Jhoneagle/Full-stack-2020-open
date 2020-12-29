import React, { useState, useCallback, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'react-bootstrap'

import useNotification from '../hooks/useNotification'

const severityStyles = {
  'success': { bg: 'bg-success', txt: 'text-light' },
  'error': { bg: 'bg-danger', txt: 'text-light' },
  'warning': { bg: 'bg-warning', txt: 'text-light' },
  'info': { bg: 'bg-info', txt: 'text-light' },
}

const classNameKeys = Object.keys(severityStyles)

const Notification = ({ id, message, timeout, level }) => {
  const [show, setShow] = useState(true)

  const notificationHelper = useNotification()

  const type = classNameKeys.includes(level)
    ? severityStyles[level]
    : { bg: null, txt: null }

  const remove = useCallback(() => {
    setShow(false)
  }, [])

  useLayoutEffect(() => {
    setTimeout(() => {
      notificationHelper.remove(id)
    }, timeout)
  }, [id, timeout, notificationHelper])

  return (
    <Toast onClose={remove} show={show} delay={timeout} autohide>
      <Toast.Body className={type.bg}>
        <span className={type.txt}>{message}</span>
      </Toast.Body>
    </Toast>
  )
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
}

export default Notification