import React from 'react'
import PropTypes from 'prop-types'
import { Jumbotron } from 'react-bootstrap'

const NoResource = ({ resource }) => {
  return (
    <Jumbotron>
      <p className='lead'>There are currently no {resource} to display.</p>
    </Jumbotron>
  )
}

NoResource.propTypes = {
  resource: PropTypes.string.isRequired,
}

export default NoResource