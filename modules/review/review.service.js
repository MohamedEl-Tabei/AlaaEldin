const reviewRepo = require("./review.repository");
const userRepo = require("../user/user.repository");
const errorFactory = require("../../shared/error/errorFactory");
const addToUser = async ({ userId, stars, feedback, details }) => {
  const user = await userRepo.findById(userId);
  if (!user) errorFactory.notFound();
  const review = await reviewRepo.create({ stars, feedback, details });
  const avgRating = getNewAVGReview(
    user.countReviews,
    user.avgRating,
    review.stars,
  );
  user.countReviews++;
  user.avgRating = avgRating;
  await user.save();
  return { avgRating };
};
const getNewAVGReview = (reviewsCount, averageRating, stars) => {
  return (averageRating * reviewsCount + stars) / (reviewsCount + 1);
};
const reviewServices = { addToUser };
module.exports = reviewServices;
