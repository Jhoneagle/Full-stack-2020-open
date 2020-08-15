import React from 'react'

const Anecdote = ({ anecdote, voteHandler }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteHandler(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote