import logger from './logger'

export const resolveApolloErrors = ({ graphQLErrors, networkError }) => {
  let errors

  if (networkError) {
    logger.error(`${networkError}`)

    errors = ['Something went wrong...']
  } else if (graphQLErrors) {
    errors = graphQLErrors.reduce((result, error) => {
      const { message, locations, path, extensions } = error

      logger.error(
        `Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )

      switch (extensions.code) {
      case 'BAD_USER_INPUT':
        return result.concat(extensions.exception.errorMessages)
      default:
        result.push(message)
        return result
      }
    }, [])
  }

  return errors
}