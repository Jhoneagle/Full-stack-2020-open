import React from 'react'

const Anecdote = ({ anecdote, voteHandler }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <button onClick={() => voteHandler(anecdote.id)}>Vote</button>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote
