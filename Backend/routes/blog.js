const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE BLOG (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, status, tags } = req.body;

    const blog = new Blog({
      title,
      content,
      status,
      tags,
      author: req.user.email,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL BLOGS (public)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE BLOG (protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
