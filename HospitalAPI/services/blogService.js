const Blog = require('../models/Blog');

// Create a new blog
exports.createBlog = async (blogData) => {
  const blog = new Blog(blogData);
  await blog.save();
  return blog;
};

// Get blogs with pagination and optional filtering
exports.getBlogs = async (query, page, limit) => {
  const skip = (page - 1) * limit;
  const blogs = await Blog.find(query).sort({ publishDate: -1 }).skip(skip).limit(limit);
  const total = await Blog.countDocuments(query);
  
  return { total, blogs };
};

// Get a blog by ID
exports.getBlogById = async (id) => {
  return await Blog.findById(id);
};

// Update a blog by ID
exports.updateBlog = async (id, blogData) => {
  const blog = await Blog.findByIdAndUpdate(id, blogData, { new: true, runValidators: true });
  return blog;
};

// Delete a blog by ID
exports.deleteBlog = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);
  return blog;
};
