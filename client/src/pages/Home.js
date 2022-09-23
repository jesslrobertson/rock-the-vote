import React, { useContext, useEffect }from 'react'
import { ContentContext } from '../context/ContentProvider'
import PostList from '../components/PostList'

export default function Home(){

  const { getAllPosts, state } = useContext(ContentContext)

  useEffect(() => {
    getAllPosts()
  }, [])


  
  return (
    <div>
      <h2>This is the home page. All posts will appear here in order of popularity</h2>
      <PostList posts={ state.posts }/>
    </div>
  )
}