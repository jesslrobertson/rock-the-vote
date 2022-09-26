const express = require("express")
const postRouter = express.Router()
const Post = require('../models/post.js')
const mongoose = require('mongoose')

// Get All posts
postRouter.get("/", (req, res, next) => {
  Post.find((err, posts) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(posts)
  })
})

// Add new post
postRouter.post("/", (req, res, next) => {
  console.log(req.body)
  req.body.user = req.auth._id
  const newPost = new Post(req.body)
  newPost.upvotes.push(req.auth._id)
  newPost.save((err, savedPost) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedPost)
  })
})

//Get posts by user id
postRouter.get("/:user", (req, res, next) => {
  Post.find({user: req.auth._id}, (err, posts) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(posts)
  })
})

// Delete post
postRouter.delete("/:postId", (req, res, next) => {
  Post.findOneAndDelete(
    { _id: req.params.postId, user: req.auth._id },
    (err, deletedPost) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send()
    }
  )
})

// Update post
postRouter.put("/:postId", (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedPost) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedPost)
    }
  )
})

postRouter.put("/upvote/:postId", (req, res, next) => {
  Post.findByIdAndUpdate(
    { _id: req.params.postId, user: req.auth._id },
    { $addToSet: { upvotes: req.auth._id }, $pull: { downvotes: req.auth._id }},
    { new: true },
    (err, updatedPost) => {
      if(err){
        res.status(500)
        return next(err)
      }
      console.log(`${updatedPost}`)
      return res.status(201).send(updatedPost)
    }
  )
})

postRouter.put("/downvote/:postId", (req, res, next) => {
  Post.findByIdAndUpdate(
    { _id: req.params.postId, user: req.auth._id },
    { $addToSet: { downvotes: req.auth._id }, $pull: { upvotes: req.auth._id }},
    { new: true },
    (err, updatedPost) => {
      if(err){
        res.status(500)
        return next(err)
      }
      console.log(updatedPost)
      return res.status(201).send(updatedPost)
    }
  )
})

postRouter.put("/removeUpvote/:postId", (req, res, next) => {
  Post.findByIdAndUpdate(
    {_id: req.params.postId},
    { $pull: {upvotes: mongoose.Types.ObjectId(req.auth._id)}},
    {new: true},
    (err, updatedPost) => {
      if(err){
        res.status(500)
        return next(err)
      }
      console.log(`${updatedPost}`)
      return res.status(201).send(updatedPost)
    }
  )
})

postRouter.put("/removeDownvote/:postId", (req, res, next) => {
  Post.findByIdAndUpdate(
    {_id: req.params.postId},
    { $pull:{ downvotes: mongoose.Types.ObjectId(req.auth._id)}},
    {new: true},
    (err, updatedPost) => {
      if(err){
        res.status(500)
        return next(err)
      }
      console.log(`${updatedPost}`)
      return res.status(201).send(updatedPost)
    }
  )
})



module.exports = postRouter