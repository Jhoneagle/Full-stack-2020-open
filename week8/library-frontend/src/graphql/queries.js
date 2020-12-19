import { gql } from '@apollo/client'

// SERVER QUERIES
const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    bookCount
    born
    id
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      ...AuthorDetails
    }
    published
    genres
    id
  }
  ${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query fetchBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

// CLIENT QUERIES
export const ALL_NOTIFICATIONS = gql`
  query allNotifications {
    allNotifications @client
  }
`

export const ADD_NOTIFICATION = gql`
  mutation addNotification($message: String!, $timeout: Int, $level: String) {
    addNotification(message: $message, timeout: $timeout, level: $level) @client
  }
`

export const REMOVE_NOTIFICATION = gql`
  mutation removeNotification($id: ID!) {
    removeNotification(id: $id) @client
  }
`