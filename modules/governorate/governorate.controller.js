const errorFactory = require("../../shared/error/errorFactory");
const governorateService = require("./governorate.service");
const create = async (req, res) => {
  await governorateService.create(req.body);
  const governorates = await governorateService.findAll();
  res.status(201).json(governorates);
};

const findAllByLanguage = async (req, res) => {
  if (!["ar", "en"].includes(req.params.language))
    errorFactory.badRequest("Invalid language parameter");
  const governorates = await governorateService.findAllbyLanguage(
    req.params.language,
  );
  res.json(governorates);
};
const update = async (req, res) => {
  const updatedGovernorate = await governorateService.update(
    req.params.id,
    req.body,
  );
  if (!updatedGovernorate) {
    return res.status(404).json({ message: "Governorate not found" });
  }
  res.json(updatedGovernorate);
};
const deleteOne = async (req, res) => {
  const deletedGovernorate = await governorateService.delete(req.params.id);
  if (!deletedGovernorate) {
    return res.status(404).json({ message: "Governorate not found" });
  }
  res.json({ message: "Governorate deleted successfully" });
};
const GovernorateController = {
  create,
  findAllByLanguage,
  update,
  deleteOne,
};
module.exports = GovernorateController;
