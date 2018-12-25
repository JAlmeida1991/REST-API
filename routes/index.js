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
  if (!title || !body)
    // Bad request code
    return res.status(400).send({ error: "Title or Body is missing..." });
  try {
    const post = await Post.create({ title, body });
    // Created code
    res.status(201).send(post);
  } catch (e) {
    // Server error code
    res
      .status(500)
      .send({ error: "Title or Body needs a minimum of 5 characters" });
  }
});

// GET ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ error: "Missing id..." });
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
  if (!id) return res.status(400).send({ error: "Missing id..." });

  const { title, body } = req.body;

  if (!title || !body)
    return res.status(400).send({ error: "Title or Body is missing..." });

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $set: { title, body } },
      { new: true }
    );
    res.send(post);
  } catch (e) {
    res.status(400).send({ error: "Post was not modified" });
  }
});

// DELETE ID

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ error: "Missing id..." });

  try {
    const post = await Post.findByIdAndDelete(id);
    res.send(post);
  } catch (e) {
    res.status(400).send({ error: "Post was not deleted" });
  }
});

module.exports = router;
