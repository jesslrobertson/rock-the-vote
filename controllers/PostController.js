const mongoose = require("mongoose")
const PostModel = require("../models/post")

const PostController = {
  find: async (req, res) => {
    let found = await PostModel.find()
    res.json(found)
  },
  all: async (req, res) => {
    let allPosts = await PostModel.find()
    res.json(allPosts)
  },
  // create: async(req, res) => {

  // }
  getAllComments: async (req, res) => {
    let foundPost = await PostModel.find({_id: req.params.postId}).populate("comments")
    res.json(foundPost)
  }
}

module.exports = PostController