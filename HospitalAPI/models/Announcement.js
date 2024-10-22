const mongoose = require("mongoose");
const slugify = require("slugify"); // npm install slugify

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true }, // Slug for URL-friendly announcements
    description: { type: String, trim: true },
    type: { type: String, required: true, enum: ["Notice", "News", "Event"] },
    category: { type: String, trim: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    startDate: { type: Date, required: true }, // Start date is now required
    ImpLink: { type: String, trim: true }, // Link field for additional information or registration
    author: { type: String, required: true, trim: true }, // Author is now required
    thumbnailImage: { 
      type: String,
      validate: {
        validator: function (v) {
          return /https?:\/\/.*\.(?:png|jpg|jpeg|gif)/i.test(v); // Basic URL validation for image
        },
        message: props => `${props.value} is not a valid image URL!`
      }
    },
    attachment: { 
      type: String,
      validate: {
        validator: function (v) {
          return /https?:\/\/.+/i.test(v); // Basic URL validation for attachments
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived", "Upcoming", "Ongoing", "Past"],
      default: "Published",
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from the title
announcementSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
