//look into UseReducer to manage the many different kinds of State
import React, { useReducer, useContext, useState } from "react";
import axios from "axios";
import { resolvePath } from "react-router-dom";

export const ContentContext = React.createContext();
const contentAxios = axios.create();

contentAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function ContentProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    posts: [
      {
        _id: "",
        title: "",
        imgUrl: "",
        description: "",
        user: "",
        comments: [],
        upvotes: [],
        downvotes: [],
        timestamp: "",
        __v: 0,
      },
    ],
    currentPost:"",
    message: "",
  };


  function contentReducer(state, action) {
    switch (action.type) {
      case 'getPosts':
        return {
          ...state,
          posts: action.value
        }
      case 'appendPosts':
        return {
          ...state,
          posts: state.posts.concat(action.value)
        }
      case 'removePost':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.value)
      }
      case 'updateCurrentPost':
        return {
          ...state,
          currentPost: action.value
        }
      case 'adjustVotes':
        return {
          ...state,
          currentPost: action.value
        }
      case 'addDownvote':
        return {
          ...state,
          currentPost: action.value
        }
      case 'removeVote':
        return {
          ...state,
          currentPost: action.value
        }
      case 'comment':
        return {
          ...state,
          currentPost: action.value
        }
      case 'removeComment':
        return {
          ...state,
          currentPost: action.value
        }
      default:
        throw new Error();
    }
  }

  
    const [state, dispatch] = useReducer(
      contentReducer,
      initState
    )
    
    function getUserPosts() {
      contentAxios
        .get("/api/post/user")
        .then((res) => {
          dispatch({type: 'getPosts', value: res.data})
        })
        .catch((err) => console.log(err.response.data.errMsg));
    }
  
  function addPost(newPost) {
    contentAxios
      .post("/api/post", newPost)
      .then(res => {
        dispatch({type: 'appendPosts', value: res.data})
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getAllPosts() {
    contentAxios
      .get("/api/post/")
      .then((res) => {
        dispatch({type: 'getPosts', value: res.data})
        //clean this up so we're not overwriting state
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deletePost(postId) {
    contentAxios
      .delete(`/api/post/${postId}`)
      .then((res) => {
        dispatch({type: 'removePost', value: res.data._id})
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // //TODO getComments()
  // //TODO postComment()

  function upvotePost(postId, index) {
    dispatch({type: 'updateCurrentPost', value: state.posts.find(post => post._id === postId)})
    if (
      state.posts[index].downvotes?.includes(state.user._id) ||
      state.posts[index].upvotes?.includes(state.user._id)
    ) {
      console.log('calling to remove vote')
      contentAxios
        .put(`/api/post/removeVote/${postId}`)
        .then((res) => {
          dispatch({type: 'adjustVotes', value: res.data })
          console.log(res.data.downvotes)
        })
        .catch((err) => console.log(err.response.data.errMsg));
    } else {
      console.log('calling to upvote')
      contentAxios
        .put(`/api/post/upvote/${postId}`)
        .then((res) => {
          console.log(res)
          // dispatch({type: 'adjustVotes', value: res.data})
          // console.log(res.data.downvotes)
        })
        .catch((err) => console.log(err.response.data.errMsg));
    }
  }

  function downvotePost(postId, index) {
    dispatch({type: 'updateCurrentPost', value: state.posts.find(post => post._id === postId)})
    if (
      state.posts[index].downvotes?.includes(state.user._id) ||
      state.posts[index].upvotes?.includes(state.user._id)
    ) {
      contentAxios
        .put(`/api/post/removeVote/${postId}`)
        .then((res) => {
          dispatch({type: 'adjustVotes', value: res.data })
          console.log(res.data.downvotes)
        })
        .catch((err) => console.log(err.response.data.errMsg));
    } else {
      contentAxios
        .put(`/api/post/upvote/${postId}`)
        .then((res) => {
          console.log(resolvePath)
          // dispatch({type: 'adjustVotes', value: res.data})
          // console.log(res.data.downvotes)
        })
        .catch((err) => console.log(err.response.data.errMsg));
    }
  }

  return (
    <ContentContext.Provider
      value={{
        state,
        dispatch,
        getUserPosts,
        // ...userContent,
        getAllPosts,
        addPost,
        deletePost,
        upvotePost,
        downvotePost,
      }}
    >
      {props.children}
    </ContentContext.Provider>
  );
}
