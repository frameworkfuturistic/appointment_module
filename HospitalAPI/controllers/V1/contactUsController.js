// controllers/contactUsController.js
const contactUsService = require('../../services/contactUsService');

const createContactUsEntry = async (req, res) => {
    try {
        const contactEntry = await contactUsService.createContactUsEntry(req.body);
        res.status(201).json(contactEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllContactUsEntries = async (req, res) => {
    try {
        const entries = await contactUsService.getAllContactUsEntries();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createContactUsEntry,
    getAllContactUsEntries
};
