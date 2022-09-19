import React from "react";
import Post from "./Post";

export default React.memo(function PostList(props) {
  const { posts } = props;

  return (
    <div>
      <h2>
        I'm a list of posts. An array of posts will be mapped over to render
        here.
      </h2>
      {posts?.map(post => <Post {...post} key={post._id} id={post._id}/>)}
    </div>
  );
})
