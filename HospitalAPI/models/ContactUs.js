// models/ContactUs.js
const mongoose = require('mongoose');

// Define the schema for contact us submissions
const contactUsSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true // Automatically trims whitespace
    },
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true // Store emails in lowercase
    },
    phone: { 
        type: String, 
        required: true, 
        trim: true // Automatically trims whitespace
    },
    query: { 
        type: String, 
        required: true, 
        trim: true // Automatically trims whitespace
    },
}, { timestamps: true });

// Pre-save hook to trim the strings
contactUsSchema.pre('save', function(next) {
    // Ensure the fields are trimmed
    this.name = this.name.trim();
    this.email = this.email.trim().toLowerCase(); // Ensure email is in lowercase
    this.phone = this.phone.trim();
    this.query = this.query.trim();
    next();
});

// Create the model
const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
