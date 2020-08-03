import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(voteAnecdote(anecdote.id))
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList