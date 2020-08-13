import anecdoteService from './../services/anecdotes'

const compareAnecdotes = (anecdote1, anecdote2) => {
  if (anecdote2.votes !== anecdote1.votes) {
    return anecdote2.votes - anecdote1.votes
  }
  
  return anecdote1.content.localeCompare(anecdote2.content)
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data).sort(compareAnecdotes)
    case 'INIT_ANECDOTES':
      return action.data.sort(compareAnecdotes)
    case 'VOTE':
      const changedAnecdote = action.data
      const updateList = state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote 
      )
      
      return updateList.sort(compareAnecdotes)
    default: return state.sort(compareAnecdotes)
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer