import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../graphql/queries'

const toGenres = (genres, book) => {
  const newGenres = book.genres.filter((g) => g && !genres.includes(g))
  return genres.concat(newGenres)
}

const useBookGenres = () => {
  const [books, setBooks] = useState([])
  const [genresState, setGenresState] = useState({
    genres: [],
    hasGenres: false,
  })
  const getAllBooks = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (!getAllBooks.loading) {
      const newBooks = getAllBooks.data ? getAllBooks.data.allBooks : books
      const genres = newBooks.reduce(toGenres, [])

      setGenresState({ genres, hasGenres: true })
      setBooks(newBooks)
    }
  }, [books, getAllBooks])

  return genresState
}

export default useBookGenres
