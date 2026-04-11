const { LANGUAGES } = require("../../shared/constants");
const { validateAndThrowIdHelper } = require("../../shared/helper");
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
  async findById(id) {
    validateAndThrowIdHelper(id);
    return await neighborhoodRepository.getById(id);
  },
  async create({ nameAr, nameEn, governorateID }) {
    
    return await neighborhoodRepository.create({
      nameAr,
      nameEn,
      governorateID,
    });
  },
};
module.exports = NeighborhoodService;
