import React, { useContext, useEffect, useState } from 'react'
import { ContentContext } from "../context/ContentProvider"

export default function Vote(props){
  const { upvotePost, downvotePost, removeUpvote, removeDownvote, dispatch, state} = useContext(ContentContext)
  const { postId, upvotes, downvotes, index, voteStatus} = props 



  // useEffect(() => {
  //   console.log(state.posts)
  // }, state.posts)

  return(
    <div className="vote-box">
      <button 
        className={
          voteStatus == "yea" 
          ? "yea"
          : "neutral"
        }
        onClick={
          voteStatus == "yea"
          ? ()=>removeUpvote(postId, voteStatus)
          : ()=>upvotePost(postId, voteStatus)
        }
        >{state.posts[index]?.upvotes?.length} Yea</button>
      <button 
      className={
        voteStatus == 'nay' 
        ? "nay"
        : "neutral"
      }
        onClick={
          voteStatus == 'nay'
          ? ()=>removeDownvote(postId, voteStatus)
          : ()=>downvotePost(postId, voteStatus)
        }
        >{state.posts[index]?.downvotes?.length} Nay</button>
        <button>Add Comment</button>
    </div>
  )
}