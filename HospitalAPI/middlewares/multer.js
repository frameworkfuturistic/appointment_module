// middlewares/multer.js
const multer = require('multer');
const path = require('path');

// Define storage for the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Path where files will be stored
    },
    filename: (req, file, cb) => {
        // Create a unique filename using the current timestamp
        cb(null, Date.now() + path.extname(file.originalname)); // Save as timestamp + original extension
    }
});

// Create the upload instance
const upload = multer({ storage });

module.exports = upload;
