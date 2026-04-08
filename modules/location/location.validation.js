const Joi = require("joi");

const createLocationSchema = Joi.object({
  governorateId: Joi.string().required(),
  areaId: Joi.string().required(),
  streetName: Joi.string().required(),
  apartment: Joi.string().required(),
  floorNumber: Joi.string().required(),
  buildingNumber: Joi.string().required(),
  additionalDetails: Joi.string().optional(),
});

const updateLocationSchema = Joi.object({
  governorateId: Joi.string().optional(),
  areaId: Joi.string().optional(),
  streetName: Joi.string().optional(),
  apartment: Joi.string().optional(),
  floorNumber: Joi.string().optional(),
  buildingNumber: Joi.string().optional(),
  additionalDetails: Joi.string().optional(),
});

module.exports = {
  createLocationSchema,
  updateLocationSchema,
};
