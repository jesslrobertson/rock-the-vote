import React, { useContext, useEffect } from 'react'
import { ContentContext } from "../context/ContentProvider"

export default React.memo(function Vote(props){
  const { upvotePost, downvotePost, dispatch, state} = useContext(ContentContext)
  const { postId, upvotes, downvotes, index } = props 


  return(
    <>
      <button onClick={()=>{
        upvotePost(postId, index)
        }}>{upvotes.length}--Upvote</button>
      <button onClick={()=>downvotePost(postId, index)}>{downvotes.length}--Downvote</button>
    </>
  )
})