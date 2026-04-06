// const userRepo=require("./user.repository.js")
// const test = async (req, res) => {
//     await res.status(200).json({
//         message:"test"
//     })
// };

// module.exports = {test};

const userRepo = require("./user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, email, password, phone, language } = req.body;

  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepo.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    language,
  });

  res.status(201).json({ message: "User created successfully", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userRepo.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(200).json({ message: "Login successful", token });
};
const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
module.exports = { register, login, getMe };