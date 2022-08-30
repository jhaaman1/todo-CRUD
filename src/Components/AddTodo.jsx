import React from 'react'
import { useState } from 'react'

export const AddTodo = ({handleAdd}) => {

    const [text, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = () => {
        handleAdd(text)
    }
    
  return (
    <div>
        <input type="text" placeholder='write something' onChange={handleChange} />
        <button onClick={handleSubmit}>Add</button>
    </div>
  )
}
