import React from 'react'
import { useHistory } from 'react-router-dom'
import  { useField } from './../hooks'

const CreateNew = (props) => {
  const { value:content, bind:bindContent, reset:resetContent } = useField('text')
  const { value:author, bind:bindAuthor, reset:resetAuthor } = useField('text')
  const { value:info, bind:bindInfo, reset:resetInfo } = useField('text')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input  {...bindContent} />
        </div>
        <div>
          author
          <input  {...bindAuthor} />
        </div>
        <div>
          url for more info
          <input  {...bindInfo} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
