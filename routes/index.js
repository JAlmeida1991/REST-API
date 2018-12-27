const express = require("express");
const Post = require("../models");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// POST
router.post("/", async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body)
    return res.status(400).send({ error: "Title or Body is missing..." });

  try {
    const post = await Post.create({ title, body });
    res.status(201).send(post);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// GET ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ error: "Missing id..." });

  try {
    const post = await Post.findById(id);
    res.send(post);
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

// PUT ID

router.put("/:id", async (req, res) => {
  const { id } = req.params;
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
    res.status(400).send({ error: e.message });
  }
});

// DELETE ID

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ error: "Missing id..." });

  try {
    const post = await Post.findByIdAndDelete(id);
    res.send(post);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
