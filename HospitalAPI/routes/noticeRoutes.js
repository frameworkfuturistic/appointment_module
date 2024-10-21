// routes/noticeRoutes.js
const express = require('express');
const { createNotice, getNotices } = require('../controllers/noticeController');
const upload = require('../config/upload'); // Assuming multer upload configuration

const router = express.Router();

router.post('/notices', upload.single('image'), createNotice);
router.get('/notices', getNotices);

module.exports = router;
