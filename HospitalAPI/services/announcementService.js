const Announcement = require('../models/Announcement');

// Create a new announcement
exports.createAnnouncement = async (announcementData) => {
    const announcement = new Announcement(announcementData);
    await announcement.save();
    return announcement;
};

// Get paginated announcements with optional filtering
exports.getAnnouncements = async (query, page, limit) => {
    const skip = (page - 1) * limit;
    const announcements = await Announcement.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = await Announcement.countDocuments(query);
    
    return { total, announcements };
};

// Get a single announcement by ID
exports.getAnnouncementById = async (id) => {
    return await Announcement.findById(id);
};

// Update an announcement by ID
exports.updateAnnouncement = async (id, announcementData) => {
    const announcement = await Announcement.findByIdAndUpdate(id, announcementData, { new: true, runValidators: true });
    return announcement;
};

// Delete an announcement by ID
exports.deleteAnnouncement = async (id) => {
    const announcement = await Announcement.findByIdAndDelete(id);
    return announcement;
};
