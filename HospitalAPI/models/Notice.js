// models/Notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  image: String, // URL or path for the image
});

module.exports = mongoose.model('Notice', noticeSchema);
