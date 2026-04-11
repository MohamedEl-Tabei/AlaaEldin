const Joi=require("joi")

const create=Joi.object({
    nameAr:Joi.string().required().min(3).max(100),
    nameEn:Joi.string().required().min(3).max(100)
})


const neighborhoodValidation={create}
module.exports=neighborhoodValidation