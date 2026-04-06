const mongoose = require("mongoose");
const schemaConfig = require("../../shared/schemaConfig");
const userSchema = new mongoose.Schema({
  lastName: { ...schemaConfig.userName },
  firstName: { ...schemaConfig.userName },
  language: { ...schemaConfig.language },
  email: { ...schemaConfig.email },
  phone: { ...schemaConfig.egyptianPhone },
  password: { ...schemaConfig.password },
  idNumber: { ...schemaConfig.idNumber },
  permission: { ...schemaConfig.permission },
  location: { ...schemaConfig.location },
  isPartner: { ...schemaConfig.isPartner },
  isVerified: { ...schemaConfig.isVerified },
  profileImage: String,
  idImageFront: {
    type: String,
    required: true,
  },
  idImageBack: {
    type: String,
    required: true,
  },
  idImageSelfie: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User
