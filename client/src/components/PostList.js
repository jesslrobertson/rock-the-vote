import React from 'react'
import Post from './Post'

export default function PostList(props){
  const { userPosts } = props
  return (
    <div>
      <h2>I'm a list of posts. An array of posts will be mapped over to render here.</h2>
      { userPosts?.map(post => <Post {...post} key={post._id}/>)}
    </div>
  )
}