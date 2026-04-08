const Review = require("./review.model");

const reviewRepo = {
  create: async ({ stars, feedback, details, reviewer, user }) => {
    return await Review.create({ stars, feedback, details, reviewer, user });
  },
};

module.exports = reviewRepo;
