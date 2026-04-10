const Joi=require('joi');
const createGovernorateSchema=Joi.object({
    nameAr:Joi.string().required().max(100).min(2),
    nameEn:Joi.string().required().max(100).min(2),
});
const updateGovernorateSchema=Joi.object({
    nameAr:Joi.string().max(100).min(2),
    nameEn:Joi.string().max(100).min(2),
});
const GovernorateValidation={
    create:createGovernorateSchema,
    update:updateGovernorateSchema,
};
module.exports=GovernorateValidation;