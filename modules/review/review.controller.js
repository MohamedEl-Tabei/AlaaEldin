const service = require("./review.service");
const addToUser = async (req, res) => {
  const body = req.body;
  const data = await service.addToUser({ ...body });
  res.status(200).json(data);
};
const controller = { addToUser };
module.exports = controller;
