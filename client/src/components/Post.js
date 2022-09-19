import React from 'react'
import CommentBox from './CommentBox'

export default function Post(){

  return (
    <div>
      <h2>I'm a post!</h2>
      <div className='post-stats'>
        <p>Display number of votes here</p>
        <p>Display number of comments here</p>
      </div>
    </div>
  )
}