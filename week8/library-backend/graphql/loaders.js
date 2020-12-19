const DataLoader = require('dataloader')
const _countBy = require('lodash.countby')
const Book = require('../models/Book')
const Author = require('./models/authors')

const createBookCountLoader = () => {
  return new DataLoader(async (authorIds) => {
    const books = await Book.find({})
    const booksByAuthorId = books.map((b) => b.author)
    const authorIdCounts = _countBy(booksByAuthorId, (id) => id)

    return authorIds.map((id) => authorIdCounts[id] || 0)
  })
}

const createAuthorLoader = () => {
  return new DataLoader(async (keys) => {
    const authors = await Author.find({ _id: { $in: keys } })

    return keys.map((key) =>
      authors.find((author) => author.id === key) ||
      new Error(`No result for ${key}`)
    )
  })
}

module.exports = { createBookCountLoader, createAuthorLoader }