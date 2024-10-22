const Blog = require('../models/Blog');

// Create a new blog
exports.createBlog = async (blogData) => {
  try {
    const blog = new Blog(blogData); // Create a new Blog instance with image data
    await blog.save(); // Save the blog to the database
    return blog; // Return the created blog
  } catch (error) {
    throw new Error('Error creating blog: ' + error.message);
  }
};

// Get blogs with pagination and optional filtering
exports.getBlogs = async (query, page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const blogs = await Blog.find(query)
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments(query);

    return { total, blogs };
  } catch (error) {
    throw new Error('Error retrieving blogs: ' + error.message);
  }
};

// Get a blog by ID
exports.getBlogById = async (id) => {
  try {
    return await Blog.findById(id);
  } catch (error) {
    throw new Error('Error retrieving blog: ' + error.message);
  }
};

// Update a blog by ID
exports.updateBlog = async (id, blogData) => {
  try {
    const blog = await Blog.findByIdAndUpdate(id, blogData, {
      new: true,
      runValidators: true,
    });
    return blog;
  } catch (error) {
    throw new Error('Error updating blog: ' + error.message);
  }
};

// Delete a blog by ID
exports.deleteBlog = async (id) => {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
  } catch (error) {
    throw new Error('Error deleting blog: ' + error.message);
  }
};
