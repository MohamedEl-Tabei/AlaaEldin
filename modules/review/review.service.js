const reviewRepo = require("./review.repository");
const userRepo = require("../user/user.repository");
const errorFactory = require("../../shared/error/errorFactory");
const {
  calculateNewAVGRatingHelper,
  validateAndThrowIdHelper,
} = require("../../shared/helper");
const addToUser = async ({
  revieweeId,
  stars,
  feedback,
  details,
  reviewerId,
}) => {
  //#region Validation
  if (!revieweeId) errorFactory.badRequest("Reviewee ID is required");

  validateAndThrowIdHelper(revieweeId, "Reviewee ID");

  if (reviewerId === revieweeId)
    errorFactory.forbidden("You cannot review yourself");
  const reviewee = await userRepo.findById(revieweeId);

  if (!reviewee) errorFactory.notFound();
  if (!reviewee.isPaternal)
    errorFactory.forbidden("You can only review paternal users");
  //#endregion
  //#region Create Review
  const review = await reviewRepo.create({
    stars,
    feedback,
    details,
    reviewer: reviewerId,
    revieweeId: revieweeId,
  });
  //#endregion
  //#region Update User's Rating
  const avgRating = calculateNewAVGRatingHelper(
    reviewee.countReviews,
    reviewee.avgRating,
    review.stars,
  );
  reviewee.countReviews++;
  reviewee.avgRating = avgRating;
  await reviewee.save();
  //#endregion
  return { avgRating };
};

const reviewServices = { addToUser };
module.exports = reviewServices;
