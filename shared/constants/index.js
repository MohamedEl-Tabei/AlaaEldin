const baseURL = "/api/v1";
const permissions = {
  service: "service",
  realEstate: "realEstate",
  marketplace: "marketplace",
  stores: "stores",
  list: ["service", "realEstate", "marketplace", "stores"]
}
const languages = {
  ar: "ar",
  en: "en",
  list: ["ar", "en"]
};
const constants = {
  baseURL,
  languages,
  permissions
};
module.exports = constants;
