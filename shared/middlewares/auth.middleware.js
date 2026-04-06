const jwt = require("jsonwebtoken");
const userRepo = require("../../modules/user/user.repository");

const authGuard = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userRepo.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user;
  next();
};

module.exports = { authGuard };