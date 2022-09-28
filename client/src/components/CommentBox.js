import React, { useContext } from 'react'
import Comment from './Comment'
import { ContentContext } from '../context/ContentProvider'

export default function CommentBox(){
  const { singlePost } = useContext(ContentContext)
  console.log(singlePost.comments)

  return (
    <div>
      <h1>I'm a comment section! A list of comments will be mapped over to populate here.</h1>
      <Comment />
    </div>
  )
}