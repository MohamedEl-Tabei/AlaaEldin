const mongoose = require("mongoose");
const { LANGUAGES, PERMISSIONS } = require("../constants");

const userNameConfig = {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  minLength: 3,
  maxLength: 20,
};
const languageConfig = {
  type: String,
  enum: LANGUAGES.LIST,
};
const emailConfig = {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
  match: /^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
};
const egyptianPhoneConfig = {
  type: String,
  required: true,
  trim: true,
  match: /^01[0125][0-9]{8}$/,
};
const passwordConfig = {
  type: String,
  required: true,
  trim: true,
};
const idNumberConfig = {
  type: String,
  required: true,
  trim: true,
  match: /^\d{14}$/, // 14 digits
};
const permissionConfig = {
  type: String,
  enum: PERMISSIONS.LIST,
};
const locationConfig = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Location",
};

const isPaternalConfig = {
  type: Boolean,
  default: false,
};
const isVerifiedConfig = {
  type: Boolean,
  default: false,
};

module.exports = {
  userNameConfig,
  languageConfig,
  emailConfig,
  egyptianPhoneConfig,
  passwordConfig,
  idNumberConfig,
  permissionConfig,
  locationConfig,
  isPaternalConfig,
  isVerifiedConfig,
};
