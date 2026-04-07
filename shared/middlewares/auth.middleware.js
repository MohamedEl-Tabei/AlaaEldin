const jwt = require("jsonwebtoken");
const userRepo = require("../../modules/user/user.repository");
const errorFactory = require("../error/errorFactory");

const authGuard = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    errorFactory.unauthorized("No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userRepo.findById(decoded.id);
  if (!user) {
    errorFactory.unauthorized("No token provided");
  }

  req.user = user;
  next();
};

module.exports = { authGuard };
