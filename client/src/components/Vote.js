import React, { useContext } from 'react'
import { ContentContext } from "../context/ContentProvider"

export default function Vote(props){
  const { upvotePost, downvotePost } = useContext(ContentContext)
  const { postId } = props 
  return(
    <>
      <button onClick={()=>upvotePost(postId)}>Like</button>
      <button onClick={()=>downvotePost(postId)}>Dislike</button>
    </>
  )
}