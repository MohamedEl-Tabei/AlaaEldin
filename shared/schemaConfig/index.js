const mongoose = require("mongoose");
const constants = require("../constants");

const userName = {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  minLength: 3,
  maxLength: 20,
};
const language = {
  type: String,
  enum: constants.languages.list,
};
const email = {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
  match: /^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
};
const egyptianPhone = {
  type: String,
  required: true,
  trim: true,
  match: /^01[0125][0-9]{8}$/,
};
const password = {
  type: String,
  required: true,
  trim: true,
};
const idNumber = {
  type: String,
  required: true,
  trim: true,
  match: /^\d{14}$/, // 14 digits
};
const permission = {
  type: String,
  enum: constants.permissions.list,
};
const location = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Location',
};
const isPartner = {
  type: Boolean,
  default: false,
};
const isVerified = {
  type: Boolean,
  default: false,
};
const permession = {
  type: String,
  enum: constants.permissions.list,
};
const schemaConfig = {
  userName,
  language,
  email,
  egyptianPhone,
  password,
  idNumber,
  permission,
  location,
  isPartner,
  isVerified,
  permession,
};
module.exports = schemaConfig;
