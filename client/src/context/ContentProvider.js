//look into UseReducer to manage the many different kinds of State
import React, { useReducer, useContext, useState } from 'react'
import axios from 'axios'

export const ContentContext = React.createContext()
const contentAxios = axios.create()

contentAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function ContentProvider(props){

  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    posts: [{
      _id: "",
      title: "",
      imgUrl: "",
      description: "",
      user: "",
      comments: [],
      upvotes: [
      ],
      downvotes: [
      ],
      timestamp: "",
      __v: 0
    }],
    message: ""
  }

  const [userContent, setUserContent] = useState(initState)
  // function handleVotes(){
  //   const [state, dispatch] = React.useReducer(
  //     reducer, 
  //     reducerState
  //   )
  // }

  // function reducer(state, action) {
  //   let newState;
  //   switch (action.type) {
  //     case 'upvote':
  //       newState = { upvotes: state.upvotes + 1 };
  //       break;
  //     case 'downvote':
  //       newState = { downvotes: state.downvotes - 1 };
  //       break;
  //     case 'comment':
  //     newState = { };
  //     break;
  //     case 'removeComment':
  //     newState = { };
  //     break;
  //     default:
  //       throw new Error();
  //   }
  //   return newState;
  // }


  function getUserPosts(){
    contentAxios.get("/api/post/user")
      .then(res => {
        setUserContent(prevState => ({
          ...prevState,
          posts: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }


  function addPost(newPost){
    contentAxios.post("/api/post", newPost)
      .then(res => {
        setUserContent(prevState => ({
          ...prevState,
          posts: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getAllPosts(){
    contentAxios.get("/api/post/")
    .then(res => {
      setUserContent(prevState => ({
        ...prevState,
        posts: res.data
      }))
      //clean this up so we're not overwriting state
    })
    .catch(err => console.log(err.response.data.errMsg))
  }

  function deletePost(postId){
    contentAxios.delete(`/api/post/${postId}`)
    .then(res => {
      setUserContent(prevState => ({
        ...prevState,
        posts: prevState.posts.filter(post => post._id != postId),
        message: `${res.data}`
      }))
    })
    .catch(err => console.log(err.response.data.errMsg))
  }

  //TODO getComments()
  //TODO postComment()

  function upvotePost(postId){
    contentAxios.put(`/api/post/upvote/${postId}`)
    .then(res => {
      console.log("Upvote called")
      setUserContent(prevState => ({
        ...prevState,
        posts: prevState.posts.map((post) => {
          return post._id === res.data._id ? res.data : post
        })
      }))
    })
    .catch(err => console.log(err.response.data.errMsg))
  }

  function downvotePost(postId){
    contentAxios.put(`/api/post/downvote/${postId}`)
    .then(res => {
      console.log("downvote called")
      setUserContent(prevState => ({
        ...prevState,
        posts: prevState.posts.map((post) => {
          return post._id === res.data._id ? res.data : post
        })
      }))
    })
    .catch(err => console.log(err.response.data.errMsg))
  }



  return(
    <ContentContext.Provider
      value={{
        getUserPosts,
        ...userContent,
        getAllPosts,
        addPost,
        deletePost,
        upvotePost,
        downvotePost 
      }}>
        { props.children }
      </ContentContext.Provider>
  )
}