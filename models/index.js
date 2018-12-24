const mongoose = require("mongoose");

// Schema & Model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 20
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
