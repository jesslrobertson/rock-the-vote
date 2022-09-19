import React from 'react'
import Vote from '../components/Vote'
import CommentForm from '../components/CommentForm'
import CommentBox from '../components/CommentBox'

export default function SinglePost(){

  return(
    <div>
      <h2>This page will display a single post, voting form, comment form, and comments</h2>
      <Vote />
      <CommentForm />
      <CommentBox />
    </div>
  )
}