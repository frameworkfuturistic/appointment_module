const GalleryImage = require('../models/GalleryImage');

exports.createGalleryImage = async (data) => {
    const galleryImage = new GalleryImage(data);
    return await galleryImage.save();
};

exports.getGalleryImages = async (page, limit) => {
    const total = await GalleryImage.countDocuments();
    const images = await GalleryImage.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }); // Sort by created date
    return { total, images };
};

exports.getGalleryImageById = async (identifier) => {
    const query = identifier.match(/^[0-9a-fA-F]{24}$/) ? { _id: identifier } : { slug: identifier };
    return await GalleryImage.findOne(query);
};

exports.updateGalleryImage = async (id, data) => {
    return await GalleryImage.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteGalleryImage = async (id) => {
    return await GalleryImage.findByIdAndDelete(id);
};
