// services/blogService.js
const Blog = require('../models/Blog');

// Create a new blog post
const createBlog = async (data) => {
  const blog = new Blog(data);
  return await blog.save();
};

// Get all blogs with pagination
const getBlogs = async (query, page, limit) => {
  const total = await Blog.countDocuments(query);
  const blogs = await Blog.find(query).limit(limit).skip((page - 1) * limit);
  return { total, blogs };
};

// Get a single blog by ID
const getBlogById = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found'); // Enhanced error handling
  return blog;
};

// Update a blog by ID
const updateBlog = async (id, data) => {
  const blog = await Blog.findByIdAndUpdate(id, data, { new: true });
  if (!blog) throw new Error('Blog not found'); // Enhanced error handling
  return blog;
};

// Delete a blog by ID
const deleteBlog = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) throw new Error('Blog not found'); // Enhanced error handling
  return blog;
};

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
