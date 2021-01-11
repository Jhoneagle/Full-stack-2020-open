import { uid } from 'react-uid'
import { ALL_NOTIFICATIONS } from './queries'

export const resolvers = {
  Query: {
    allNotifications: (root, args, { cache }) => {
      const { allNotifications } = cache.readQuery({ query: ALL_NOTIFICATIONS })

      return allNotifications
    },
  },
  Mutation: {
    addNotification: (root, args, { cache }) => {
      const newNotification = {
        message: args.message,
        timeout: args.timeout,
        level: args.level,
        id: uid({}),
        __typename: 'Notification',
      }

      const { allNotifications } = cache.readQuery({ query: ALL_NOTIFICATIONS })

      const newData = {
        allNotifications: allNotifications.concat(newNotification),
      }

      cache.writeQuery({ query: ALL_NOTIFICATIONS, data: newData })

      return newNotification
    },
    removeNotification: (root, args, { cache }) => {
      const { allNotifications } = cache.readQuery({
        query: ALL_NOTIFICATIONS,
      })

      const notificationToRemove = allNotifications.find((n) => n.id === args.id)

      if (notificationToRemove) {
        const newData = {
          allNotifications: allNotifications.filter((n) => n.id !== args.id)
        }

        cache.writeQuery({ query: ALL_NOTIFICATIONS, data: newData })

        return notificationToRemove
      }

      return null
    },
  },
}