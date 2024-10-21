const galleryService = require('../../services/galleryService');

// Test endpoint
exports.test = async (req, res) => {
    res.status(200).json("Gallery API is working.");
};

// Create a new gallery image
exports.createGalleryImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image file is required' });
        }

        const galleryImage = await galleryService.createGalleryImage({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.file.path, // Store the file path
            createdBy: req.body.createdBy
        });

        res.status(201).json({ success: true, data: galleryImage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all gallery images with pagination
exports.getGalleryImages = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { total, images } = await galleryService.getGalleryImages(parseInt(page), parseInt(limit));

        res.status(200).json({
            success: true,
            data: {
                images,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single gallery image by ID or slug
exports.getGalleryImageById = async (req, res) => {
    try {
        const identifier = req.params.identifier;
        const galleryImage = await galleryService.getGalleryImageById(identifier);
        if (!galleryImage) return res.status(404).json({ success: false, message: 'Gallery image not found' });
        res.status(200).json({ success: true, data: galleryImage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a gallery image by ID
exports.updateGalleryImage = async (req, res) => {
    try {
        const updatedData = { ...req.body };
        if (req.file) {
            updatedData.imageUrl = req.file.path; // Update the image URL if a new file is uploaded
        }

        const galleryImage = await galleryService.updateGalleryImage(req.params.id, updatedData);
        if (!galleryImage) return res.status(404).json({ success: false, message: 'Gallery image not found' });
        res.status(200).json({ success: true, data: galleryImage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a gallery image by ID
exports.deleteGalleryImage = async (req, res) => {
    try {
        const galleryImage = await galleryService.deleteGalleryImage(req.params.id);
        if (!galleryImage) return res.status(404).json({ success: false, message: 'Gallery image not found' });
        res.status(200).json({ success: true, message: 'Gallery image deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
