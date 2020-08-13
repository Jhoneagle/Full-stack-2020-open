let timeoutID = null

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'CREATE_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const notify = (message, seconds) => {
  return async dispatch => {
    dispatch(createNotification(message))

    if (timeoutID !== null) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
      timeoutID = null
    }, seconds * 1000)
  }
}

const createNotification = (message) => {
  return {
    type: 'CREATE_NOTIFICATION',
    content: message
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer