import React, { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import PostList from "../components/PostList"
import { ContentContext } from "../context/ContentProvider"


export default function Profile(){
  const { userPosts, getUserPosts } = useContext(ContentContext)
  
  console.log(userPosts)
  return(
    <div>
      <Link to='/new-post'>
        <button>New Post</button>
      </Link>
      <h2>Hello, User </h2>
      <PostList userPosts={userPosts} />

    </div>
  )
}