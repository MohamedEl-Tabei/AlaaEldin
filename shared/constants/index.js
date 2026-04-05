const baseURL = "/api/v1";
const permissions={
  service:"service",
  realEstate:"realEstate",
  marketPlace:"marketPlace",
  store:"store",
  list:["service","realEstate","marketPlace","store"]
}
const languages = {
  ar: "ar",
  en: "en",
  list:["ar","en"]
};
const constants = {
  baseURL,
  languages,
  permissions
};
module.exports = constants ;
