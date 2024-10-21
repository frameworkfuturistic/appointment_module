// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    publishDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
    image: { type: String }, 
});

module.exports = mongoose.model('Blog', blogSchema);
