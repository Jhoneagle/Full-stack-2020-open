const config = require('../utils/config')
const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')
const {
  UserInputError,
  AuthenticationError,
  PubSub
} = require('apollo-server')

const {
  getModelValidationErrors,
  useFallbackErrorHandler,
} = require('../utils/errorHelper')

const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })

        const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate('author')

        return books
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })

        return Book.find({ author: { $in: author.id } }).populate('author')
      } else if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      } else {
        return Book.find({}).populate('author')
      }
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: ({ id }, args, { bookCountLoader }) => {
      return bookCountLoader.load(id.toString())
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (e) {
          if (e.name === 'ValidationError') {
            const validationErrors = getModelValidationErrors(e, 'Author')

            throw new UserInputError('Couldn&quot;t create new author', {
              invalidArgs: { author: args.author },
              errorMessages: validationErrors,
            })
          }

          useFallbackErrorHandler(e)
        }
      }

      const book = new Book({ ...args, author: author._id })

      try {
        await book.save()

      } catch (e) {
        if (e.name === 'ValidationError') {
          const validationErrors = getModelValidationErrors(e, 'Book')

          throw new UserInputError('Could not create a new book', {
            invalidArgs: args,
            errorMessages: validationErrors,
          })
        }

        useFallbackErrorHandler(e)
      }

      const populatedBook = await book.populate("author").execPopulate()

      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook })

      return populatedBook
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = {
  resolvers,
}