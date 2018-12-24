const express = require("express");
const Post = require("../models");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// POST
router.post("/", async (req, res) => {
  const { title, body } = req.body;
  const post = await Post.create({ title, body });
  res.send(post);
});

// GET ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.send(post);
  } catch (e) {
    res.status(404).send({ error: "Post could not be fetched..." });
  }
});

// PUT ID

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);
  res.send(post);
});

module.exports = router;
