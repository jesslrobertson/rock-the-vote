const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  votes: {
    type: Number
  },
  voters: {
    type: Array
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Post", postSchema)