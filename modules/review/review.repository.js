const Review = require("./review.model");

const reviewRepo = {
  create: async ({ stars, feedback, details }) => {
    return await Review.create({ stars, feedback, details });
  },
};

module.exports = reviewRepo;
