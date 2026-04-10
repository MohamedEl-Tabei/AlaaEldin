const locationRepository = require("./location.repository");
const governorateService = require("../governorate/governorate.service");
const neighborhoodService = require("../neighborhood/neighborhood.service");
createLocation = async ({
  governorateId,
  areaId,
  streetName,
  apartment,
  floorNumber,
  buildingNumber,
  additionalDetails,
}) => {
  const governorate = await governorateService.findById(governorateId);
  if (!governorate) errorFactory.notFound("Governorate not found");
  const neighborhood = await neighborhoodService.findById(areaId);
  if (!neighborhood) errorFactory.notFound("Neighborhood not found");
  const isNeighborhoodInGovernorate =
    neighborhood.governorate.toString() === governorateId;
  if (!isNeighborhoodInGovernorate)
    errorFactory.badRequest(
      "Neighborhood does not belong to the specified governorate",
    );

  return await locationRepository.create({
    governorateId,
    areaId,
    streetName,
    apartment,
    floorNumber,
    buildingNumber,
    additionalDetails,
  });
};

const locationService = {};

module.exports = locationService;
