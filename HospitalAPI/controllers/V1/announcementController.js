const announcementService = require('../../services/announcementService');

// Test endpoint
exports.test = async (req, res) => {
    res.status(200).json("Announcement API is working.");
};

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.createAnnouncement(req.body);
        res.status(201).json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get paginated list of announcements
exports.getAnnouncements = async (req, res) => {
    try {
        const { page = 1, limit = 10, type } = req.query;
        const query = type ? { type } : {};
        const { total, announcements } = await announcementService.getAnnouncements(query, parseInt(page), parseInt(limit));

        res.status(200).json({
            success: true,
            data: {
                announcements,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single announcement by ID or slug
exports.getAnnouncementById = async (req, res) => {
    try {
        const identifier = req.params.identifier;
        const announcement = await announcementService.getAnnouncementById(identifier);
        if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });
        res.status(200).json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an announcement by ID
exports.updateAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
        if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });
        res.status(200).json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an announcement by ID
exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.deleteAnnouncement(req.params.id);
        if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });
        res.status(200).json({ success: true, message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
