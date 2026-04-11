const { LANGUAGES } = require("../../shared/constants");
const errorFactory = require("../../shared/error/errorFactory");
const { validateAndThrowIdHelper } = require("../../shared/helper");
const GovernorateService = require("../governorate/governorate.service");
const neighborhoodService = require("./neighborhood.service");
const findAll = async (req, res) => {
  const neighborhoods = await neighborhoodService.findAll();
  res.json(neighborhoods);
};
const findByGovernorateIdAndLanguage = async (req, res) => {
  const { governorateId, language } = req.query;
  validateAndThrowIdHelper(governorateId, "Governorate ID");
  if (!LANGUAGES.LIST.includes(language))
    errorFactory.badRequest("Invalid language");
  if (!governorateId) errorFactory.badRequest("Governorate ID is required");
  if (!language) errorFactory.badRequest("Language is required");
  const neighborhoods =
    await neighborhoodService.findByGovernorateIdAndLanguage(
      governorateId,
      language,
    );
  res.json(neighborhoods);
};
const create=async (req,res)=>{
  const {nameAr,nameEn}=req.body;
  const {governorateID}=req.params;
  await GovernorateService.findById(governorateID);
  const data =await neighborhoodService.create({nameAr,nameEn,governorateID});
  res.json(data)
}
const NeighborhoodController = {
  findAll,
  findByGovernorateIdAndLanguage,
  create
};
module.exports = NeighborhoodController;
