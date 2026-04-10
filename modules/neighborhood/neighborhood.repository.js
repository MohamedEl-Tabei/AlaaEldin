const Neighborhood = require("./neighborhood.model");
const mongoose = require("mongoose");
const getAll = async () => {
  return await Neighborhood.find();
};
const getArabicByGovernorateId = async (governorateId) => {
  return await Neighborhood.aggregate([
    {
      $match: {
        governorateID: governorateId,
      },
    },
    {
      $project: {
        _id: 1,
        name: "$nameAr",
      },
    },
  ]);
};
const getEnglishByGovernorateId = async (governorateId) => {
  return await Neighborhood.aggregate([
    {
      $match: {
        governorateID: governorateId,
      },
    },
    {
      $project: {
        _id: 1,
        name: "$nameEn",
      },
    },
  ]);
};
const NeighborhoodRepository = {
  getAll,
  getArabicByGovernorateId,
  getEnglishByGovernorateId,
};
module.exports = NeighborhoodRepository;
