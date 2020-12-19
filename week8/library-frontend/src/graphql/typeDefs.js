import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Notification {
    message: String!
    timeout: Int
    level: String
    id: ID!
  }
  extend type Query {
    allNotifications: [Notification!]!
  }
  extend type Mutation {
    addNotification(message: String!, level: String, timeout: Int): Notification
    removeNotification(id: ID!): Notification
  }
`