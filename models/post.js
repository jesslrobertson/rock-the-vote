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
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  totalVotes: {
    type: Number,
    default: () => {
      if (this.upvotes && this.downvotes) {
        this.upvotes.length - this.downvotes.length
      } else if (this.upvotes){
        return this.upvotes.length
      } else {
        return 0
      }
    },
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Post", postSchema)