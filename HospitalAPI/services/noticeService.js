// services/blogService.js
const Notice = require('../models/Notice');

// Create a new notice post
const createNotice = async (data) => {
  const notice = new Notice(data);
  return await notice.save();
};

// Get all notice with pagination
const getNotice = async (query, page, limit) => {
  const total = await Notice.countDocuments(query);
  const notice = await Notice.find(query).limit(limit).skip((page - 1) * limit);
  return { total, notice };
};

// Get a single notice by ID
const getBlogById = async (id) => {
  const notice = await Notice.findById(id);
  if (!notice) throw new Error('Notice not found'); // Enhanced error handling
  return notice;
};

// Update a blog by ID
const updateNotice = async (id, data) => {
  const notice = await Notice.findByIdAndUpdate(id, data, { new: true });
  if (!notice) throw new Error('Notice not found'); // Enhanced error handling
  return notice;
};

// Delete a blog by ID
const deleteNotice = async (id) => {
  const notice = await Notice.findByIdAndDelete(id);
  if (!notice) throw new Error('Notice not found'); // Enhanced error handling
  return notice;
};

module.exports = { createNotice, getNotice, getNoticeById, updateNotice, deleteNotice };
