import React, { useContext } from 'react'
import { ContentContext } from "../context/ContentProvider"

export default React.memo(function Vote(props){
  const { upvotePost, downvotePost } = useContext(ContentContext)
  const { postId, upvotes, downvotes } = props 
  return(
    <>
      <button onClick={()=>upvotePost(postId)}>{upvotes.length}--Upvote</button>
      <button onClick={()=>downvotePost(postId)}>{downvotes.length}--Downvote</button>
    </>
  )
})