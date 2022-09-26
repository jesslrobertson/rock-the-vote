import React, { useContext } from "react";
import Post from "./Post";
import { ContentContext } from "../context/ContentProvider";

export default function PostList(props) {
  const { state } = useContext(ContentContext);
  // const relativeVotes = 

  function compareNumbers(a, b) {
    return a - b;
  }

  const sortedPosts = state.posts.upvotes


  return (
    <div>
      <h2>
        I'm a list of posts. An array of posts will be mapped over to render
        here.
      </h2>
      {state.posts?.map((post, index) => (
        <Post {...post} key={post._id} id={post._id} index={index} />
      ))}
    </div>
  );
};
