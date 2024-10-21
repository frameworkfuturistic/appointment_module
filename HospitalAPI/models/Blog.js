const mongoose = require('mongoose');
const slugify = require('slugify');

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [150, 'Title cannot exceed 150 characters'],
        index: true, // Indexing title for better search performance
    },
    slug: {
        type: String,
        unique: true,
    },
    content: {
        type: String,
        required: [true, 'Blog content is required'],
        minlength: [50, 'Content must be at least 50 characters long'],
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['health', 'wellness', 'research', 'news'], // Restricting to specific categories
        index: true, // Indexing for better query performance
    },
    tags: [
        {
            type: String,
            trim: true,
            maxlength: [30, 'Tag cannot exceed 30 characters'],
        },
    ],
    publishDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['published', 'draft', 'archived'],
        default: 'draft',
        index: true, // Indexing for performance on filtering
    },
    image: {
        type: String, // This should be the image path or URL
        validate: {
            validator: function (value) {
                return value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/uploads/');
            },
            message: 'Invalid image path. Must be a URL or a valid upload path.',
        },
    },
    readTime: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt
});

// Pre-save hook to generate slug from title
blogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

// Virtual field to calculate estimated read time (assuming 200 words per minute)
blogSchema.virtual('estimatedReadTime').get(function () {
    const wordCount = this.content.split(' ').length;
    const readingSpeed = 200; // Words per minute
    return Math.ceil(wordCount / readingSpeed); // Rounded up to nearest minute
});

// Indexes for improving performance
blogSchema.index({ slug: 1 });
blogSchema.index({ tags: 1 });

// Custom method for status update (example for future use)
blogSchema.methods.updateStatus = function (newStatus) {
    this.status = newStatus;
    return this.save();
};

// Blog model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
