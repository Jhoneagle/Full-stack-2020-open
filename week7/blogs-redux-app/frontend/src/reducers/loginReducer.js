import loginService from '../services/login'
import blogsService from '../services/blogs'

const initialState = null

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}

export const initializeCredentials = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch({
        type: 'LOGIN',
        user
      })

      blogsService.setToken(user.token)
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })

    window.localStorage.setItem('loggedInUser', JSON.stringify(user))

    dispatch({
      type: 'LOGIN',
      user
    })

    blogsService.setToken(user.token)
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })

    window.localStorage.removeItem('loggedInUser')
    blogsService.removeToken()
  }
}

export default loginReducer