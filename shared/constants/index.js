const BASE_URL = "/api/v1";

const PERMISSIONS = Object.freeze({
  SERVICE: "service",
  REAL_ESTATE: "realEstate",
  MARKETPLACE: "marketplace",
  STORES: "stores",
  LIST: ["service", "realEstate", "marketplace", "stores"],
});

const LANGUAGES = Object.freeze({
  AR: "ar",
  EN: "en",
  LIST: ["ar", "en"],
});

const STATUS_CODES = Object.freeze({
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
});

module.exports = {
  BASE_URL,
  PERMISSIONS,
  LANGUAGES,
  STATUS_CODES,
};
