import React, { useState, useContext } from 'react'
import { ContentContext } from '../context/ContentProvider'

const initInputs = {
  title: "",
  description: "",
  imgUrl: ""
}

export default function PostForm(props){
  const { addPost } = useContext(ContentContext)
  const [inputs, setInputs] = useState(initInputs)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addPost(inputs)
    setInputs(initInputs)
  }

  const { title, description, imgUrl } = inputs
  return (
    <div>
      <form onSubmit={handleSubmit} className="post-form">
        <input 
          type="text" 
          name="title" 
          value={title} 
          onChange={handleChange} 
          placeholder="Title"/>
        <input
          type="text" 
          name="description" 
          value={description} 
          onChange={handleChange} 
          placeholder="Content"
          className="post-content"
          />
        <input 
          type="text" 
          name="imgUrl" 
          value={imgUrl} 
          onChange={handleChange} 
          placeholder="Image Url"/>
        <button>Add Post</button>
      </form>
    </div>
  )
}