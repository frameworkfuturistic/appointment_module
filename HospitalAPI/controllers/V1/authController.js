const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

// Store hashed admin password (hashed version of 'FRIDAY@123')
const hashedAdminPassword = bcrypt.hashSync('Friday#@123', 10);

// Helper to generate the username based on the date
const generateUsername = () => moment().format('YYYYMMDD');

// Login controller
exports.login = async (req, res) => {
    const { password, superPassword, username } = req.body;

    if (username !== generateUsername()) {
        return res.status(400).json({ message: "Invalid username format. Please use the correct date format (YYYYMMDD)." });
    }

    try {
        // Super password validation
        if (superPassword) {
            const hashedSuperPassword = process.env.SUPER_PASSWORD_HASH; // Ensure super password is hashed
            const isSuperPasswordValid = await bcrypt.compare(superPassword, hashedSuperPassword);

            if (isSuperPasswordValid) {
                const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true, secure: true }); // Secure cookie for HTTPS
                return res.status(200).json({ message: "Logged in with super password", token });
            } else {
                return res.status(400).json({ message: "Incorrect super password" });
            }
        }

        // Admin password validation
        const isPasswordValid = await bcrypt.compare(password, hashedAdminPassword);

        if (isPasswordValid) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.status(200).json({ message: "Logged in successfully", token });
        } else {
            return res.status(400).json({ message: "Incorrect password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

// Logout controller
exports.logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: "Logged out successfully" });
};
