const Governorate = require("./governorate.model");
const mongoose = require("mongoose");
const GovernorateRepository = {
  async create(data) {
    const governorate = new Governorate(data);
    return await governorate.save();
  },

  async findById(id) {
    return await Governorate.findById(id);
  },

  async findAllInEnglish() {
    return await Governorate.aggregate([
      {
        $project: {
          _id: 1,
          name: "$nameEn",
        },
      },
    ]);
  },

  async findAllInArabic() {
    return await Governorate.aggregate([
      {
        $project: {
          _id: 1,
          name: "$nameAr",
        },
      },
    ]);
  },

  async delete(id) {
    return await Governorate.findByIdAndDelete(id);
  },
};
module.exports = GovernorateRepository;
