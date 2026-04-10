const mongoose = require("mongoose");

const governorateSchema = new mongoose.Schema({
  nameAr: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  nameEn: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});
const Governorate = mongoose.model("Governorate", governorateSchema);
module.exports = Governorate;
