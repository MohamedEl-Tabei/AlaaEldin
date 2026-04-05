const mongoose = require("mongoose");
const schemaConfig = require("../../shared/schemaConfig");
const userSchema = new mongoose.Schema({
  lastName: { ...schemaConfig.userName },
  firstName: { ...schemaConfig.userName },
  language: { ...schemaConfig.language },
  email: { ...schemaConfig.email },
  phone: { ...schemaConfig.egyptianPhone },
  password: { ...schemaConfig.password },
  profileImage: String,
  idImageFront: {
    type: String,
    require: true,
  },
  idImageBack: {
    type: String,
    require: true,
  },
  idImageSelfie: {
    type: String,
    require: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports=User
