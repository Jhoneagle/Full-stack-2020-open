const config = require('./utils/config')
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('./models/user')
const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')
const { createBookCountLoader } = require('./graphql/loaders')

const url =  config.MONGODB_URI

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to db')
  })
  .catch((err) => {
    console.log('Error connecting to db', err.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const loaders = {
      bookCountLoader: createBookCountLoader(),
    }

    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser, ...loaders }
    }

    return loaders
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})