// const mongoose = require("mongoose")
// const CommentModel = require("../models/comment")

// const CommentController = {
//   find: async (req, res) => {
//     let found = await CommentModel.find()
//     res.json(found)
//   },
//   all: async (req, res) => {
//     let allComments = await CommentModel.find()
//     res.json(allComments)
//   },
//   // create: async(req, res) => {

//   // }
//   getAllComments: async (req, res) => {
//     let foundComment = await CommentModel.find({_id: req.params.postId}).populate("comments")
//     res.json(foundComment)
//   }
// }