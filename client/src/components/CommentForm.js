import React, { useContext, useState, useRef } from "react";
import { ContentContext } from "../context/ContentProvider";
import useDynamicHeightField from "./useDynamicHeightField";
import cn from "classnames";

export default function CommentForm(props) {
  const { addComment, state } = useContext(ContentContext);
  const { postId } = props;
  const [commentValue, setCommentValue] = useState({
    comment: ""
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const INITIAL_HEIGHT = 48;
  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  useDynamicHeightField(textRef, commentValue.comment);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  function handleChange(e) {
    setCommentValue(prev => {
      return {
        [e.target.name]: e.target.value
      }
    });
    console.log(commentValue.comment)
  }

  function handleCancel(e) {
    setCommentValue({
      [e.target.name]: ""
    });
    setIsExpanded(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addComment(commentValue, postId);
    setCommentValue({
      comment: ""
    });
    setIsExpanded(false);
  }

  return (
    <div className="comment-form">
      <form
        name="commentForm"
        onSubmit={handleSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.comment,
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT,
        }}
      >
        <div className="header">
          <div className="user">
            <span>Commenting as {state.user.username}</span>
          </div>
        </div>
        <textarea
          ref={textRef}
          onClick={onExpand}
          onFocus={onExpand}
          onChange={handleChange}
          className="comment-field"
          placeholder="Comment..."
          value={commentValue.comment}
          name="comment"
          id="comment"
        />
        <div 
        className="actions"
        >
          <button 
          type="button" className="cancel" 
          onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" 
            disabled ={commentValue.comment?.length == 0}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
