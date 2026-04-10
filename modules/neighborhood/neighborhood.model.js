const mongoose = require("mongoose");

const neighborhoodSchema = new mongoose.Schema({
  nameAr: {
    type: String,
    required: true,
    trim: true,
  },
  nameEn: {
    type: String,
    required: true,
    trim: true,
  },
  governorateID: {
    type: String,
    required: true,
  },
});
neighborhoodSchema.index({ governorateID: 1 });

neighborhoodSchema.index({ nameAr: 1, governorateID: 1 }, { unique: true });

neighborhoodSchema.index({ nameEn: 1, governorateID: 1 }, { unique: true });
const Neighborhood = mongoose.model("Neighborhood", neighborhoodSchema);
module.exports = Neighborhood;
