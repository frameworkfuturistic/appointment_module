const express = require('express');
const { login, logout } = require('../../controllers/V1/authController');
const { verifyToken } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Login Route
router.post('/login', login);

// Logout Route
router.post('/logout', verifyToken, logout);

module.exports = router;
