import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { ContentContext } from '../context/ContentProvider'
import CommentBox from './CommentBox'



export default function Post(props){
  const { title, imgUrl, description, user: postUser, _id: postId} = props
  // const userId = localStorage.getItem("user")
  const { user: loggedInUser } = useContext(UserContext)
  const { deletePost } = useContext(ContentContext)



  const userPost = (
    <> 
      <h2>{title}</h2>
      <h4>{`By ${loggedInUser.username}`}</h4>
      {imgUrl && <img src={imgUrl} alt="user image" className="post-img" />}
      <p>{description}</p>
      <div className='post-stats'>
        <p>Display number of votes here</p>
        <p>Display number of comments here</p>
      </div>
      <div className="edit-delete-box">
        <button>Edit</button>
        <button onClick={() => deletePost(postId)}>Delete</button>
      </div>
    </>
  )

  const otherPost = (
    <>
      <h2 >{title}</h2>
      {imgUrl && <img src={imgUrl} alt="user image" className="post-img"/>}
      <p>{description}</p>
      <div className='post-stats'>
        <p>Display number of votes here</p>
        <p>Display number of comments here</p>
      </div>
    </>
  )

  
  return (
    <div className="post" key={postId}>
      { loggedInUser._id === postUser ?
      userPost
      : otherPost
      }
    </div>

  )
}