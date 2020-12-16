import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS } from './queries'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const result_authors = useQuery(ALL_AUTHORS)
  const result_books = useQuery(ALL_BOOKS)

  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if ( result_authors.loading || result_books.loading ) {
    return null
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
	notify={notify}
	authors={result_authors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
	books={result_books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
	setError={notify} 
      />
    </div>
  )
}

export default App