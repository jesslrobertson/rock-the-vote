import React, { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import PostList from "../components/PostList"
import { ContentContext } from "../context/ContentProvider"
import { UserContext } from "../context/UserProvider"


export default function Profile(){
  const { 
    posts,
    getUserPosts,
    getAllPosts
  } = useContext(ContentContext)

  const {
    user: {
      username
    }
  } = useContext(UserContext)
  
  useEffect(()=> {
    getUserPosts()
  }, [])
  
  return(
    <div>
      <Link to='/new-post'>
        <button>New Post</button>
      </Link>
      <h2>Hello, {username}</h2>
      <PostList posts={posts} />

    </div>
  )
}