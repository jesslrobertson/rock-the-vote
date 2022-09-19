//look into UseReducer to manage the many different kinds of State
import React, { useReducer, useContext, useState } from 'react'
import UserContext from './UserProvider'
import axios from 'axios'

export const ContentContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function ContentProvider(props){

  const [userPosts, setUserPosts] = useState([])
  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case 'upvote':
        newState = { votes: state.votes + 1 };
        break;
      case 'removeUpvote':
        newState = { votes: state.votes -1}
      case 'downvote':
        newState = { votes: state.votes - 1 };
        break;
      case 'removeDownvote':
      newState = { votes: state.votes + 1 };
      break;
      default:
        throw new Error();
    }
    return newState;
  }


  function getUserPosts(){
    userAxios.get("/api/post/user")
      .then(res => {
        setUserPosts(prevState => ({
          ...prevState,
          posts: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function addPost(newPost){
    userAxios.post("/api/post", newPost)
      .then(res => {
        setUserPosts(prevState => ({
          ...prevState,
          posts: [...prevState, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }


  return(
    <ContentContext.Provider
      value={{
        getUserPosts,
        // getUserComments,
        addPost
        // addUserComment,
        // addUserVote
      }}>
        { props.children }
      </ContentContext.Provider>
  )
}