import React, { useContext, useEffect } from 'react'
import { ContentContext } from "../context/ContentProvider"

export default function Vote(props){
  const { upvotePost, downvotePost, dispatch, state} = useContext(ContentContext)
  const { postId, upvotes, downvotes, index } = props 

  useEffect(() => {
    console.log(state.posts)
  }, state.posts)

  return(
    <>
      <p>{state.posts[index].upvotes.length}</p>
      <button onClick={()=>{
        upvotePost(postId, index)
        }}>{state.posts[index].upvotes.length}--Upvote
      </button>
      <p>{downvotes.length}</p>
      <button onClick={()=>downvotePost(postId, index)}>{downvotes.length}--Downvote</button>
    </>
  )
}