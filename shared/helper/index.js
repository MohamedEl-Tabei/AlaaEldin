const mongoose = require("mongoose");
const errorFactory = require("../error/errorFactory");
const calculateNewAVGRatingHelper = (reviewsCount, averageRating, stars) => {
  return (averageRating * reviewsCount + stars) / (reviewsCount + 1);
};
const validateAndThrowIdHelper = (id,label) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw errorFactory.badRequest(`Invalid ${label}`);
  return true;
};
module.exports = { calculateNewAVGRatingHelper, validateAndThrowIdHelper };
