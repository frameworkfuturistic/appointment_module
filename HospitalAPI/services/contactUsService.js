// services/contactUsService.js
const ContactUs = require('../models/ContactUs');

const createContactUsEntry = async (contactData) => {
    const contactEntry = new ContactUs(contactData);
    return await contactEntry.save();
};

const getAllContactUsEntries = async () => {
    return await ContactUs.find().sort({ createdAt: -1 }); // Get entries in descending order
};

module.exports = {
    createContactUsEntry,
    getAllContactUsEntries
};
