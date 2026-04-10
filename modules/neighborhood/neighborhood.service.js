const { LANGUAGES } = require("../../shared/constants");
const neighborhoodRepository = require("./neighborhood.repository");
const NeighborhoodService = {
  async findAll() {
    return await neighborhoodRepository.getAll();
  },
  async findByGovernorateIdAndLanguage(governorateId, language) {
    return language.toLowerCase() == LANGUAGES.AR.toLowerCase()
      ? await neighborhoodRepository.getArabicByGovernorateId(governorateId)
      : await neighborhoodRepository.getEnglishByGovernorateId(governorateId);
  },
};
module.exports = NeighborhoodService;
