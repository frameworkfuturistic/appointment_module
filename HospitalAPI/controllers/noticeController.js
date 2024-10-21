// controllers/noticeController.js
const Notice = require('../models/Notice');
exports.getNotices = (req, res) => {
  res.send('List of notices');
};

exports.createNotice = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const image = req.file ? req.file.path : ''; // Assuming you're uploading files

    const newNotice = new Notice({
      title,
      description,
      date,
      image,
    });

    await newNotice.save();
    res.status(201).json({ success: true, data: newNotice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
