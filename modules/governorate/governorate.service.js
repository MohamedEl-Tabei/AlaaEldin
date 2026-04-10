const { LANGUAGES } = require("../../shared/constants");
const errorFactory = require("../../shared/error/errorFactory");
const governorateRepository = require("./governorate.repository");
const GovernorateService = {
  async create(data) {
    return await governorateRepository.create(data);
  },
  async findById(id) {
    const governorate = await governorateRepository.findById(id);
    if (!governorate) errorFactory.notFound("Governorate not found");
    return governorate;
  },

  async findAllbyLanguage(lang) {
    return lang == LANGUAGES.EN
      ? await governorateRepository.findAllInEnglish()
      : await governorateRepository.findAllInArabic();
  },
  async update(id, data) {
    return await governorateRepository.update(id, data);
  },
  async delete(id) {
    return await governorateRepository.delete(id);
  },
};
module.exports = GovernorateService;
