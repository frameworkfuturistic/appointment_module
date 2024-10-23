const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // File name with extension
  }
});

// Initialize upload with size limit of 1 MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit set to 1 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type, only PDF and Word files are allowed!'), false);
    }
    cb(null, true);
  }
});

module.exports = upload;
