const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  author: { type: String, required: true },
  tags: [String], // ✅ tags array
  likes: { type: Number, default: 0 }, // ✅ likes
  comments: [
    {
      user: String, // who commented
      text: String, // comment text
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model("Blog", blogSchema);
