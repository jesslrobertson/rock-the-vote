import React, { useContext } from "react";
import Post from "./Post";
import { ContentContext } from "../context/ContentProvider";

export default function PostList(props) {
  const { state } = useContext(ContentContext);
  //subtract downvotes from upvotes, and sort based on that number
  // const relativeVotes = 

  function compareNumbers(a, b) {
    return a - b;
  }

  // const sortedPosts = state.posts.comparativeVote.sort(compareNumbers)


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
