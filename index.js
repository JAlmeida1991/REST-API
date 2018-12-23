const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DB connection
mongoose
  .connect(
    "mongodb://localhost:27017/rest-api",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB has started..."))
  .catch(err => console.log(err));

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

// GET
app.get("/api", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// POST
app.post("/api", async (req, res) => {
  const { title, body } = req.body;
  const post = await Post.create({ title, body });
  res.send(post);
});

// GET ID
app.get("/api/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.send(post);
  } catch (e) {
    res.status(404).send({ error: "Post could not be fetched..." });
  }
});

// PUT ID

app.put("/api/:id", async (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  const post = await Post.findByIdAndUpdate(
    id,
    { $set: { title, body } },
    { new: true }
  );
  res.send(post);
});

// DELETE ID

app.delete("/api/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);
  res.send(post);
});

app.listen(port, () => console.log(`Server has started on port ${port}`));
