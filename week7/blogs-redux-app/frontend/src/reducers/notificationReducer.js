let timeoutID = null
const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'CREATE_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const notify = (message, seconds, type='success') => {
  return async dispatch => {
    dispatch(createNotification({ message, type }))

    if (timeoutID !== null) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
      timeoutID = null
    }, seconds * 1000)
  }
}

const createNotification = (notification) => {
  return {
    type: 'CREATE_NOTIFICATION',
    notification
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer