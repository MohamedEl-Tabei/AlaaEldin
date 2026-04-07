// const user = require("./user.model");
// const create = async (data) => {
//   const newUser = new user(data);
//   await newUser.save();
// };

// module.exports = {
//   create,
// };

const User = require("./user.model");

const create = async (data) => {
  const newUser = new User(data);
  await newUser.save();
  return newUser;
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const findAll = async () => {
  return await User.find().select("-password");
};

const updateById = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).select(
    "-password",
  );
};

const deleteById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  create,
  findByEmail,
  findById,
  findAll,
  updateById,
  deleteById,
};
