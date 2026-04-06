const mongoose = require("mongoose");
const {
  userNameConfig,
  languageConfig,
  emailConfig,
  egyptianPhoneConfig,
  passwordConfig,
  idNumberConfig,
  permissionConfig,
  locationConfig,
  isPartnerConfig,
  isVerifiedConfig,
} = require("../../shared/schemaConfig");
const userSchema = new mongoose.Schema({
  lastName: { ...userNameConfig },
  firstName: { ...userNameConfig },
  language: { ...languageConfig },
  email: { ...emailConfig },
  phone: { ...egyptianPhoneConfig },
  password: { ...passwordConfig },
  idNumber: { ...idNumberConfig },
  permission: { ...permissionConfig },
  location: { ...locationConfig },
  isPartner: { ...isPartnerConfig },
  isVerified: { ...isVerifiedConfig },
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
module.exports = User;
