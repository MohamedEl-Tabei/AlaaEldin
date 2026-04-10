const Review = require("./review.model");

const reviewRepo = {
  create: async ({ stars, feedback, details, reviewerId, revieweeId }) => {
    return await Review.create({ stars, feedback, details, reviewerId, revieweeId });
  },
};

module.exports = reviewRepo;
