const userRepo = require("./user.repository");
const errorFactory = require("../../shared/error/errorFactory");
const setUserPaternal = async (isPaternal, userId) => {
  const user = await userRepo.findById(userId);
  if (!user) errorFactory.notFound("User not found");

  user.isPaternal = isPaternal;
  await user.save();
};
module.exports = {
  setUserPaternal,
};
