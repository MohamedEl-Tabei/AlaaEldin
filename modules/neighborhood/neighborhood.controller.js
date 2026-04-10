const { LANGUAGES } = require("../../shared/constants");
const errorFactory = require("../../shared/error/errorFactory");
const { validateAndThrowIdHelper } = require("../../shared/helper");
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
const NeighborhoodController = {
  findAll,
  findByGovernorateIdAndLanguage,
};
module.exports = NeighborhoodController;
