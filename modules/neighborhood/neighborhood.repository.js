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
const getById = async (id) => {
  return await Neighborhood.findById(id);
};
const create=async({nameAr,nameEn,governorateID})=>{
  const neighborhood=new Neighborhood({nameAr,nameEn,governorateID})
  await neighborhood.save();
  return neighborhood;
}
const NeighborhoodRepository = {
  getAll,
  getById,
  getArabicByGovernorateId,
  getEnglishByGovernorateId,
  create
};
module.exports = NeighborhoodRepository;
