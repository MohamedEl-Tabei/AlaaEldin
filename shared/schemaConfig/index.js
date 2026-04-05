const  constants = require("../constants");

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
  match: /^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
};
const egyptianPhone = {
  type: String,
  required: true,
  match: /^01[0125][0-9]{8}$/,
};
const password = {
  type: String,
  required: true,
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
  permession,
};
module.exports =  schemaConfig ;
