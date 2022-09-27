//look into UseReducer to manage the many different kinds of State
import React, { useReducer, useContext, useState } from "react";
import axios from "axios";

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
        comparativeVote: ""
      },
    ],
    message: ""
  };

  const [state, dispatch] = useReducer(contentReducer, initState);

  function contentReducer(state, action) {
    let newState;
    const prevPosts = [...state.posts];
    switch (action.type) {
      case "getPosts":
        newState = {
          ...state,
          posts: action.value,
          order: action.order
        };
        break;
      case "appendPosts":
        newState = {
          ...state,
          posts: [...state.posts, action.value],
        };
        break;
      case "removePost":
        newState = {
          ...state,
          posts: action.value,
        };
        break;
      case "updatePosts":
        const updatedPostIndex = prevPosts.findIndex(
          (post) => post._id === action.value._id
        );
        prevPosts[updatedPostIndex] = action.value;
        newState = {
          ...state,
          posts: prevPosts,
        };
        break
      case "sortPosts":
        newState = {
          ...state,
          posts: [...prevPosts, prevPosts.comparativeVote = action.value]
        }
        break;
      // case 'removeComment':
      //   return {
      //     ...state,
      //     currentPost: action.value
      //   }
      default:
        throw new Error();
    }
    console.log(newState.posts)
    return newState;
  }

  function compareNumbers(a, b) {
    return a - b;
  }

  function sortByVotes(arr){
    let voteTotals = []
    arr.forEach((item, index) => {
      let upvotes = item.upvotes.length
      let downvotes = item.downvotes.length
      voteTotals.push(compareNumbers(upvotes, downvotes))
    })
    dispatch({ type: "sortPosts", value: voteTotals})
  }


  function getUserPosts() {
    contentAxios
      .get("/api/post/user")
      .then((res) => {
        dispatch({ type: "getPosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addPost(newPost) {
    contentAxios
      .post("/api/post", newPost)
      .then((res) => {
        dispatch({ type: "appendPosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getAllPosts() {
    contentAxios
      .get("/api/post/")
      .then((res) => {
        console.log(sortByVotes(res.data))
        sortByVotes(res.data)
        dispatch({ type: "getPosts", value: res.data});
        //clean this up so we're not overwriting state
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deletePost(postId) {
    contentAxios
      .delete(`/api/post/${postId}`)
      .then((res) => {
        const freshPosts = state.posts.filter((post) => post._id != postId);
        console.log(freshPosts);
        dispatch({ type: "removePost", value: freshPosts });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // //TODO getComments()
  // //TODO postComment()

  function upvotePost(postId, voteStatus) {
    contentAxios
      .put(`/api/post/upvote/${postId}`)
      .then((res) => {
        dispatch({ type: "updatePosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function downvotePost(postId, voteStatus) {
    contentAxios
      .put(`/api/post/downvote/${postId}`)
      .then((res) => {
        dispatch({ type: "updatePosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function removeUpvote(postId, voteStatus) {
    contentAxios
      .put(`/api/post/removeUpvote/${postId}`)
      .then((res) => {
        dispatch({ type: "updatePosts", value: res.data });
      })
      .catch((err) => console.log(err.reponse.data.errMsg));
  }

  function removeDownvote(postId, voteStatus) {
    contentAxios
      .put(`/api/post/removeDownvote/${postId}`)
      .then((res) => {
        dispatch({ type: "updatePosts", value: res.data });
      })
      .catch((err) => console.log(err.reponse.data.errMsg));
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
        removeUpvote,
        removeDownvote
      }}
    >
      {props.children}
    </ContentContext.Provider>
  );
}
