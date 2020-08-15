import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = (props) => {
  const onVote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.notify(`voted anecdote ${anecdote.content} successfully`, 5)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          voteHandler={onVote}
        />
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote, notify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)