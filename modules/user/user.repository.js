const user = require("./user.model");
const create = async (data) => {
  const newUser = new user(data);
  await newUser.save();
};

module.exports = {
  create,
};
