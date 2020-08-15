import React, { useState } from 'react'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'
import Notification from './components/Notification'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import './App.css'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const notifyWith = (message, seconds=5, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, seconds * 1000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    notifyWith(`a new anecdote ${anecdote.content} created successfully!`, 10)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const onVote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdoteForRoute = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  return (
    <div>
      <Notification notification={notification} />

      <h1>Software anecdotes</h1>
      <Menu />

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdoteForRoute} voteHandler={onVote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/createAnecdote">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App