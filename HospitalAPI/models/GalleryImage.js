const mongoose = require("mongoose");
const slugify = require("slugify"); // npm install slugify

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, required: true }, // This will store the path of the image
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from the title
galleryImageSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);

module.exports = GalleryImage;
