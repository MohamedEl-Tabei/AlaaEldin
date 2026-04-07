const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  stars: {
    type: Number,
    required: true,
  },
  feedback: String,
  details: String,
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
