const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/comment.js')
const Post = require('../models/post')
const mongoose = require('mongoose')



// Add new comment
commentRouter.post("/:postId", (req, res, next) => {
  // let id= req.params.postId.substring(1)
  // { postId: mongoose.Types.ObjectId(id) }
  // req.body.user = req.auth._id
  req.body.user = mongoose.Types.ObjectId(req.auth._id)
  req.body.post = mongoose.Types.ObjectId(req.params.postId)
  const newComment = new Comment(req.body)
  Post.findByIdAndUpdate(
    {_id: mongoose.Types.ObjectId(req.params.postId)},
    {$addToSet: {comments: newComment._id }}
    
  )
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

//Get comments by post
commentRouter.get("/:postId", (req, res, next) => {
  Comment.find(
    {postId: req.params.postId}, 
    (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

// Delete comment
commentRouter.delete("/:commentId", (req, res, next) => {
  Comment.findOneAndDelete(
    { _id: req.params.commentId, user: req.auth._id },
    (err, deletedcomment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted comment: ${deletedcomment.title}`)
    }
  )
})

// Update comment
commentRouter.put("/:commentId", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedComment)
    }
  )
})


module.exports = commentRouter