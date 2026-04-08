const reviewRepo = require("./review.repository");
const userRepo = require("../user/user.repository");
const errorFactory = require("../../shared/error/errorFactory");
const {
  calculateNewAVGRatingHelper,
  validateAndThrowIdHelper,
} = require("../../shared/helper");
const addToUser = async ({ userId, stars, feedback, details, reviewerId }) => {
  //#region Validation
  validateAndThrowIdHelper(userId, "User");

  if (reviewerId === userId)
    errorFactory.forbidden("You cannot review yourself");
  const user = await userRepo.findById(userId);

  if (!user) errorFactory.notFound();
  if (!user.isPaternal)
    errorFactory.forbidden("You can only review paternal users");
  //#endregion
  //#region Create Review
  const review = await reviewRepo.create({
    stars,
    feedback,
    details,
    reviewer: reviewerId,
    user: userId,
  });
  //#endregion
  //#region Update User's Rating
  const avgRating = calculateNewAVGRatingHelper(
    user.countReviews,
    user.avgRating,
    review.stars,
  );
  user.countReviews++;
  user.avgRating = avgRating;
  await user.save();
  //#endregion
  return { avgRating };
};

const reviewServices = { addToUser };
module.exports = reviewServices;
